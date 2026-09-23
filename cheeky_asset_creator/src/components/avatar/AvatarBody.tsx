'use client';

import { useAvatar } from '@/contexts/AvatarContext';
import * as THREE from 'three';

export function AvatarBody() {
  const { avatar, getSkinColor } = useAvatar();
  
  const skinColor = getSkinColor();
  
  const bodyScale = {
    slim: { torso: 0.85, hips: 0.85, shoulders: 0.9 },
    average: { torso: 1.0, hips: 1.0, shoulders: 1.0 },
    muscular: { torso: 1.15, hips: 0.9, shoulders: 1.2 },
    heavy: { torso: 1.2, hips: 1.25, shoulders: 1.1 },
  }[avatar.bodyType];

  return (
    <group position={new THREE.Vector3(0, 0.75, 0)}>
      {/* Torso */}
      <mesh position={new THREE.Vector3(0, 0.55, 0)} castShadow receiveShadow>
        <capsuleGeometry args={[0.22 * bodyScale.torso, 0.45, 8, 16]} />
        <meshStandardMaterial color={skinColor} roughness={0.7} />
      </mesh>
      
      {/* Chest definition for muscular */}
      {avatar.bodyType === 'muscular' && (
        <group>
          <mesh position={new THREE.Vector3(-0.1, 0.65, 0.18)} castShadow>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color={skinColor} roughness={0.7} />
          </mesh>
          <mesh position={new THREE.Vector3(0.1, 0.65, 0.18)} castShadow>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color={skinColor} roughness={0.7} />
          </mesh>
        </group>
      )}

      {/* Neck */}
      <mesh position={new THREE.Vector3(0, 0.82, 0)} castShadow>
        <cylinderGeometry args={[0.08, 0.1, 0.12, 16]} />
        <meshStandardMaterial color={skinColor} roughness={0.7} />
      </mesh>

      {/* Arms */}
      <group position={new THREE.Vector3(-0.32 * bodyScale.shoulders, 0.6, 0)}>
        {/* Upper arm */}
        <mesh castShadow>
          <cylinderGeometry args={[0.06, 0.055, 0.28, 12]} />
          <meshStandardMaterial color={skinColor} roughness={0.7} />
        </mesh>
        {/* Forearm */}
        <mesh position={new THREE.Vector3(0, -0.2, 0)} castShadow>
          <cylinderGeometry args={[0.055, 0.045, 0.26, 12]} />
          <meshStandardMaterial color={skinColor} roughness={0.7} />
        </mesh>
        {/* Hand */}
        <mesh position={new THREE.Vector3(0, -0.36, 0)} castShadow>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.7} />
        </mesh>
      </group>

      <group position={new THREE.Vector3(0.32 * bodyScale.shoulders, 0.6, 0)}>
        {/* Upper arm */}
        <mesh castShadow>
          <cylinderGeometry args={[0.06, 0.055, 0.28, 12]} />
          <meshStandardMaterial color={skinColor} roughness={0.7} />
        </mesh>
        {/* Forearm */}
        <mesh position={new THREE.Vector3(0, -0.2, 0)} castShadow>
          <cylinderGeometry args={[0.055, 0.045, 0.26, 12]} />
          <meshStandardMaterial color={skinColor} roughness={0.7} />
        </mesh>
        {/* Hand */}
        <mesh position={new THREE.Vector3(0, -0.36, 0)} castShadow>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.7} />
        </mesh>
      </group>

      {/* Hips */}
      <mesh position={new THREE.Vector3(0, 0.22, 0)} castShadow>
        <capsuleGeometry args={[0.2 * bodyScale.hips, 0.15, 8, 16]} />
        <meshStandardMaterial color={skinColor} roughness={0.7} />
      </mesh>

      {/* Legs */}
      <group position={new THREE.Vector3(-0.12 * bodyScale.hips, 0.08, 0)}>
        {/* Thigh */}
        <mesh castShadow>
          <cylinderGeometry args={[0.08, 0.07, 0.35, 12]} />
          <meshStandardMaterial color={skinColor} roughness={0.7} />
        </mesh>
        {/* Shin */}
        <mesh position={new THREE.Vector3(0, -0.28, 0)} castShadow>
          <cylinderGeometry args={[0.065, 0.055, 0.35, 12]} />
          <meshStandardMaterial color={skinColor} roughness={0.7} />
        </mesh>
        {/* Foot */}
        <mesh position={new THREE.Vector3(0, -0.5, 0.04)} castShadow>
          <boxGeometry args={[0.1, 0.06, 0.18]} />
          <meshStandardMaterial color={skinColor} roughness={0.7} />
        </mesh>
      </group>

      <group position={new THREE.Vector3(0.12 * bodyScale.hips, 0.08, 0)}>
        {/* Thigh */}
        <mesh castShadow>
          <cylinderGeometry args={[0.08, 0.07, 0.35, 12]} />
          <meshStandardMaterial color={skinColor} roughness={0.7} />
        </mesh>
        {/* Shin */}
        <mesh position={new THREE.Vector3(0, -0.28, 0)} castShadow>
          <cylinderGeometry args={[0.065, 0.055, 0.35, 12]} />
          <meshStandardMaterial color={skinColor} roughness={0.7} />
        </mesh>
        {/* Foot */}
        <mesh position={new THREE.Vector3(0, -0.5, 0.04)} castShadow>
          <boxGeometry args={[0.1, 0.06, 0.18]} />
          <meshStandardMaterial color={skinColor} roughness={0.7} />
        </mesh>
      </group>

      {/* Clothing */}
      {renderClothing()}
    </group>
  );

  function renderClothing() {
    const parts: React.ReactNode[] = [];
    
    // Top
    const topColors: Record<string, string> = {
      tshirt: avatar.topColor,
      hoodie: avatar.topColor,
      buttonup: avatar.topColor,
      tank: avatar.topColor,
      jacket: avatar.topColor,
    };
    
    const topMesh = topColors[avatar.topType] || '#3498db';
    
    switch (avatar.topType) {
      case 'tshirt':
        parts.push(
          <mesh key="tshirt" position={new THREE.Vector3(0, 0.55, 0)} castShadow>
            <capsuleGeometry args={[0.24, 0.42, 8, 16]} />
            <meshStandardMaterial color={topMesh} roughness={0.8} />
          </mesh>,
          <mesh key="tshirt-sleeves-l" position={new THREE.Vector3(-0.32, 0.6, 0)}>
            <cylinderGeometry args={[0.08, 0.07, 0.18, 12]} />
            <meshStandardMaterial color={topMesh} roughness={0.8} />
          </mesh>,
          <mesh key="tshirt-sleeves-r" position={new THREE.Vector3(0.32, 0.6, 0)}>
            <cylinderGeometry args={[0.08, 0.07, 0.18, 12]} />
            <meshStandardMaterial color={topMesh} roughness={0.8} />
          </mesh>
        );
        break;
      case 'hoodie':
        parts.push(
          <mesh key="hoodie" position={new THREE.Vector3(0, 0.55, 0)} castShadow>
            <capsuleGeometry args={[0.26, 0.44, 8, 16]} />
            <meshStandardMaterial color={topMesh} roughness={0.85} />
          </mesh>,
          <mesh key="hoodie-back" position={new THREE.Vector3(0, 0.7, -0.15)}>
            <sphereGeometry args={[0.15, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color={topMesh} roughness={0.85} />
          </mesh>,
          <mesh key="hoodie-pouch" position={new THREE.Vector3(0, 0.4, 0.22)}>
            <boxGeometry args={[0.28, 0.15, 0.08]} />
            <meshStandardMaterial color={topMesh} roughness={0.85} />
          </mesh>
        );
        break;
      case 'buttonup':
        parts.push(
          <mesh key="buttonup-left" position={new THREE.Vector3(-0.11, 0.55, 0)} castShadow>
            <capsuleGeometry args={[0.13, 0.42, 8, 16]} />
            <meshStandardMaterial color={topMesh} roughness={0.75} />
          </mesh>,
          <mesh key="buttonup-right" position={new THREE.Vector3(0.11, 0.55, 0)} castShadow>
            <capsuleGeometry args={[0.13, 0.42, 8, 16]} />
            <meshStandardMaterial color={topMesh} roughness={0.75} />
          </mesh>,
          <mesh key="collar" position={new THREE.Vector3(0, 0.78, 0.15)}>
            <torusGeometry args={[0.12, 0.02, 8, 16, Math.PI]} />
            <meshStandardMaterial color={topMesh} roughness={0.75} />
          </mesh>
        );
        break;
      case 'tank':
        parts.push(
          <mesh key="tank" position={new THREE.Vector3(0, 0.55, 0)} castShadow>
            <capsuleGeometry args={[0.22, 0.4, 8, 16]} />
            <meshStandardMaterial color={topMesh} roughness={0.8} />
          </mesh>
        );
        break;
      case 'jacket':
        parts.push(
          <mesh key="jacket" position={new THREE.Vector3(0, 0.55, 0)} castShadow>
            <capsuleGeometry args={[0.27, 0.46, 8, 16]} />
            <meshStandardMaterial color={topMesh} roughness={0.6} metalness={0.1} />
          </mesh>,
          <mesh key="jacket-zipper" position={new THREE.Vector3(0, 0.55, 0.24)}>
            <boxGeometry args={[0.015, 0.4, 0.01]} />
            <meshStandardMaterial color="#95a5a6" metalness={0.8} roughness={0.2} />
          </mesh>
        );
        break;
    }

    // Bottom
    const bottomMesh = avatar.bottomColor || '#2c3e50';
    
    switch (avatar.bottomType) {
      case 'pants':
      case 'jeans':
        parts.push(
          <mesh key="pants" position={new THREE.Vector3(0, 0.2, 0)} castShadow>
            <capsuleGeometry args={[0.22, 0.18, 8, 16]} />
            <meshStandardMaterial color={bottomMesh} roughness={0.8} />
          </mesh>,
          <mesh key="leg-l" position={new THREE.Vector3(-0.11, -0.12, 0)} castShadow>
            <cylinderGeometry args={[0.08, 0.07, 0.55, 12]} />
            <meshStandardMaterial color={bottomMesh} roughness={0.8} />
          </mesh>,
          <mesh key="leg-r" position={new THREE.Vector3(0.11, -0.12, 0)} castShadow>
            <cylinderGeometry args={[0.08, 0.07, 0.55, 12]} />
            <meshStandardMaterial color={bottomMesh} roughness={0.8} />
          </mesh>
        );
        break;
      case 'shorts':
        parts.push(
          <mesh key="shorts" position={new THREE.Vector3(0, 0.2, 0)} castShadow>
            <capsuleGeometry args={[0.22, 0.12, 8, 16]} />
            <meshStandardMaterial color={bottomMesh} roughness={0.8} />
          </mesh>,
          <mesh key="thigh-l" position={new THREE.Vector3(-0.11, 0.02, 0)} castShadow>
            <cylinderGeometry args={[0.09, 0.07, 0.2, 12]} />
            <meshStandardMaterial color={bottomMesh} roughness={0.8} />
          </mesh>,
          <mesh key="thigh-r" position={new THREE.Vector3(0.11, 0.02, 0)} castShadow>
            <cylinderGeometry args={[0.09, 0.07, 0.2, 12]} />
            <meshStandardMaterial color={bottomMesh} roughness={0.8} />
          </mesh>
        );
        break;
      case 'skirt':
        parts.push(
          <mesh key="skirt" position={new THREE.Vector3(0, 0.18, 0)} castShadow>
            <coneGeometry args={[0.28, 0.35, 32, 1, true]} />
            <meshStandardMaterial color={bottomMesh} roughness={0.8} side={THREE.DoubleSide} />
          </mesh>
        );
        break;
    }

    // Shoes
    const shoeMesh = avatar.shoeColor || '#ecf0f1';
    
    switch (avatar.shoeType) {
      case 'sneakers':
        parts.push(
          <mesh key="shoe-l" position={new THREE.Vector3(-0.11, -0.48, 0.04)} castShadow>
            <boxGeometry args={[0.12, 0.08, 0.2]} />
            <meshStandardMaterial color={shoeMesh} roughness={0.6} />
          </mesh>,
          <mesh key="shoe-r" position={new THREE.Vector3(0.11, -0.48, 0.04)} castShadow>
            <boxGeometry args={[0.12, 0.08, 0.2]} />
            <meshStandardMaterial color={shoeMesh} roughness={0.6} />
          </mesh>,
          <mesh key="sole-l" position={new THREE.Vector3(-0.11, -0.52, 0.04)}>
            <boxGeometry args={[0.12, 0.02, 0.21]} />
            <meshStandardMaterial color="#2c3e50" roughness={0.9} />
          </mesh>,
          <mesh key="sole-r" position={new THREE.Vector3(0.11, -0.52, 0.04)}>
            <boxGeometry args={[0.12, 0.02, 0.21]} />
            <meshStandardMaterial color="#2c3e50" roughness={0.9} />
          </mesh>
        );
        break;
      case 'boots':
        parts.push(
          <mesh key="boot-l" position={new THREE.Vector3(-0.11, -0.42, 0.04)} castShadow>
            <cylinderGeometry args={[0.07, 0.08, 0.18, 12]} />
            <meshStandardMaterial color={shoeMesh} roughness={0.5} metalness={0.2} />
          </mesh>,
          <mesh key="boot-r" position={new THREE.Vector3(0.11, -0.42, 0.04)} castShadow>
            <cylinderGeometry args={[0.07, 0.08, 0.18, 12]} />
            <meshStandardMaterial color={shoeMesh} roughness={0.5} metalness={0.2} />
          </mesh>
        );
        break;
      case 'sandals':
        parts.push(
          <mesh key="sandal-l" position={new THREE.Vector3(-0.11, -0.49, 0.04)} castShadow>
            <boxGeometry args={[0.11, 0.03, 0.18]} />
            <meshStandardMaterial color={shoeMesh} roughness={0.7} />
          </mesh>,
          <mesh key="sandal-r" position={new THREE.Vector3(0.11, -0.49, 0.04)} castShadow>
            <boxGeometry args={[0.11, 0.03, 0.18]} />
            <meshStandardMaterial color={shoeMesh} roughness={0.7} />
          </mesh>
        );
        break;
      case 'formal':
        parts.push(
          <mesh key="formal-l" position={new THREE.Vector3(-0.11, -0.48, 0.04)} castShadow>
            <boxGeometry args={[0.11, 0.06, 0.2]} />
            <meshStandardMaterial color={shoeMesh} roughness={0.3} metalness={0.4} />
          </mesh>,
          <mesh key="formal-r" position={new THREE.Vector3(0.11, -0.48, 0.04)} castShadow>
            <boxGeometry args={[0.11, 0.06, 0.2]} />
            <meshStandardMaterial color={shoeMesh} roughness={0.3} metalness={0.4} />
          </mesh>
        );
        break;
    }

    // Accessories
    if (avatar.accessory === 'glasses') {
      parts.push(
        <group key="glasses" position={new THREE.Vector3(0, 0.08, 0.42)}>
          <mesh position={new THREE.Vector3(-0.14, 0, 0)}>
            <circleGeometry args={[0.06, 32]} />
            <meshStandardMaterial color="#2c3e50" roughness={0.3} metalness={0.8} />
          </mesh>
          <mesh position={new THREE.Vector3(0.14, 0, 0)}>
            <circleGeometry args={[0.06, 32]} />
            <meshStandardMaterial color="#2c3e50" roughness={0.3} metalness={0.8} />
          </mesh>
          <mesh position={new THREE.Vector3(0, 0, 0.01)}>
            <boxGeometry args={[0.08, 0.01, 0.01]} />
            <meshStandardMaterial color="#2c3e50" roughness={0.3} metalness={0.8} />
          </mesh>
          <mesh position={new THREE.Vector3(-0.22, 0.02, -0.02)} rotation={[0, 0, 0.3]}>
            <boxGeometry args={[0.1, 0.01, 0.01]} />
            <meshStandardMaterial color="#2c3e50" roughness={0.3} metalness={0.8} />
          </mesh>
          <mesh position={new THREE.Vector3(0.22, 0.02, -0.02)} rotation={[0, 0, -0.3]}>
            <boxGeometry args={[0.1, 0.01, 0.01]} />
            <meshStandardMaterial color="#2c3e50" roughness={0.3} metalness={0.8} />
          </mesh>
        </group>
      );
    }
    
    if (avatar.accessory === 'sunglasses') {
      parts.push(
        <group key="sunglasses" position={new THREE.Vector3(0, 0.08, 0.42)}>
          <mesh position={new THREE.Vector3(-0.14, 0, 0)}>
            <boxGeometry args={[0.13, 0.08, 0.04]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.9} />
          </mesh>
          <mesh position={new THREE.Vector3(0.14, 0, 0)}>
            <boxGeometry args={[0.13, 0.08, 0.04]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.9} />
          </mesh>
          <mesh position={new THREE.Vector3(0, 0.02, 0.01)}>
            <boxGeometry args={[0.06, 0.015, 0.01]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.9} />
          </mesh>
        </group>
      );
    }
    
    if (avatar.accessory === 'hat') {
      parts.push(
        <group key="hat" position={new THREE.Vector3(0, 0.35, 0)}>
          <mesh castShadow>
            <cylinderGeometry args={[0.25, 0.25, 0.08, 32]} />
            <meshStandardMaterial color="#e74c3c" roughness={0.7} />
          </mesh>
          <mesh position={new THREE.Vector3(0, 0.06, 0)} castShadow>
            <cylinderGeometry args={[0.18, 0.18, 0.12, 32]} />
            <meshStandardMaterial color="#e74c3c" roughness={0.7} />
          </mesh>
          <mesh position={new THREE.Vector3(0, 0.02, 0.18)} castShadow>
            <boxGeometry args={[0.35, 0.03, 0.08]} />
            <meshStandardMaterial color="#c0392b" roughness={0.7} />
          </mesh>
        </group>
      );
    }
    
    if (avatar.accessory === 'earrings') {
      parts.push(
        <mesh key="earring-l" position={new THREE.Vector3(-0.45, -0.08, 0)} castShadow>
          <torusGeometry args={[0.025, 0.005, 8, 16]} />
          <meshStandardMaterial color="#f1c40f" metalness={0.9} roughness={0.1} />
        </mesh>,
        <mesh key="earring-r" position={new THREE.Vector3(0.45, -0.08, 0)} castShadow>
          <torusGeometry args={[0.025, 0.005, 8, 16]} />
          <meshStandardMaterial color="#f1c40f" metalness={0.9} roughness={0.1} />
        </mesh>
      );
    }
    
    if (avatar.accessory === 'necklace') {
      parts.push(
        <mesh key="necklace" position={new THREE.Vector3(0, 0.72, 0.12)} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.12, 0.008, 8, 32]} />
          <meshStandardMaterial color="#f1c40f" metalness={0.9} roughness={0.1} />
        </mesh>,
        <mesh key="pendant" position={new THREE.Vector3(0, 0.6, 0.2)}>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshStandardMaterial color="#f1c40f" metalness={0.9} roughness={0.1} />
        </mesh>
      );
    }

    return parts;
  }
}
