const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load env
const envContent = fs.readFileSync(path.join(__dirname, '../Club-Cheeky/.env.local'), 'utf8');
const env = {};
for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const [key, ...valueParts] = trimmed.split('=');
  if (key && valueParts.length > 0) {
    env[key.trim()] = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
  }
}

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function listBuckets() {
  const { data, error } = await supabase.storage.listBuckets();
  if (error) {
    console.error('Error listing buckets:', error);
    return;
  }
  console.log('Buckets:', data.map(b => b.name).join(', '));
}

async function listBucketObjects(bucketName, prefix = '') {
  const { data, error } = await supabase.storage.from(bucketName).list(prefix, {
    limit: 1000,
    depth: 10
  });
  if (error) {
    console.error(`Error listing ${bucketName}:`, error);
    return [];
  }
  return data || [];
}

async function deleteObjects(bucketName, objects) {
  if (objects.length === 0) {
    console.log(`No objects to delete in ${bucketName}`);
    return;
  }
  
  const paths = objects.map(obj => obj.name);
  console.log(`Deleting ${paths.length} objects from ${bucketName}...`);
  
  const { error } = await supabase.storage.from(bucketName).remove(paths);
  if (error) {
    console.error('Delete error:', error);
  } else {
    console.log(`✅ Deleted ${paths.length} objects`);
  }
}

async function main() {
  console.log('🔍 Scanning Supabase storage buckets...\n');
  
  await listBuckets();
  
  const buckets = ['quest-assets', 'quest-avatars'];
  
  for (const bucket of buckets) {
    console.log(`\n📦 Checking ${bucket}...`);
    const objects = await listBucketObjects(bucket);
    console.log(`   Found ${objects.length} objects`);
    
    if (objects.length > 0) {
      console.log('   Sample paths:', objects.slice(0, 5).map(o => o.name).join(', '));
      
      // Filter for quest-related assets (844, quest, etc.)
      const questObjects = objects.filter(o => 
        o.name.includes('844') || 
        o.name.includes('quest') ||
        o.name.includes('avatar') ||
        o.name.includes('character')
      );
      
      console.log(`   Quest/844 related: ${questObjects.length} objects`);
      
      if (questObjects.length > 0) {
        console.log('   To delete, run:');
        console.log(`   npx supabase storage rm ss://${bucket}/path1 ss://${bucket}/path2 ...`);
      }
    }
  }
}

main().catch(console.error);
