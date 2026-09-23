'use client';

import { useMemo } from 'react';
import { useAvatar } from '@/contexts/AvatarContext';
import * as THREE from 'three';

export function AvatarBody() {
  const { avatar, getSkinColor } = useAvatar();
  
  const skinColor = useMemo(() => new THREE.Color(getSkinColor()), [getSkinColor]);
  
  const bodyScale = useMemo(() => {
    const scales = {
      slim: { torso: 0.82, hips: 0.82, shoulders: 0.88, neck: 0.85 },
      average: { torso: 1.0, hips: 1.0, shoulders: 1.0, neck: 1.0 },
      muscular: { torso: 1.18, hips: 0.88, shoulders: 1.25, neck: 1.15 },
      heavy: { torso: 1.25, hips: 1.28, shoulders: 1.08, neck: 1.1 },
    };
    return scales[avatar.bodyType];
  }, [avatar.bodyType]);

  return (
    <group position={[0, 0.78, 0]}>
      {/* Neck */}
      <mesh position={[0, 0.85, 0]} castShadow>
        <cylinderGeometry args={[0.09 * bodyScale.neck, 0.11 * bodyScale.shoulders, 0.14, 24]} />
        <meshStandardMaterial color={skinColor} roughness={0.65} clearcoat={0.05} />
      </mesh>

      {/* Torso */}
      <group position={[0, 0.55, 0]}>
        {/* Main torso */}
        <mesh castShadow receiveShadow>
          <capsuleGeometry args={[0.24 * bodyScale.torso, 0.48, 12, 32]} />
          <meshStandardMaterial color={skinColor} roughness={0.6} clearcoat={0.08} clearcoatRoughness={0.5} />
        </mesh>
        
        {/* Chest definition */}
        {avatar.bodyType === 'muscular' && (
          <>
            <mesh position={[-0.12, 0.12, 0.19]} castShadow>
              <sphereGeometry args={[0.1, 32, 32]} />
              <meshStandardMaterial color={skinColor} roughness={0.6} />
            </mesh>
            <mesh position={[0.12, 0.12, 0.19]} castShadow>
              <sphereGeometry args={[0.1, 32, 32]} />
              <meshStandardMaterial color={skinColor} roughness={0.6} />
            </mesh>
            {/* Chest center line */}
            <mesh position={[0, 0.05, 0.23]} castShadow>
              <boxGeometry args={[0.03, 0.18, 0.02]} />
              <meshStandardMaterial color={skinColor.clone().multiplyScalar(0.88)} roughness={0.7} />
            </mesh>
          </>
        )}
        
        {/* Abs definition for slim/average */}
        {(avatar.bodyType === 'slim' || avatar.bodyType === 'average') && (
          <mesh position={[0, -0.05, 0.24]} castShadow>
            <boxGeometry args={[0.18, 0.22, 0.02]} />
            <meshStandardMaterial color={skinColor.clone().multiplyScalar(0.9)} roughness={0.65} />
          </mesh>
        )}
      </group>

      {/* Shoulders and Arms */}
      <group position={[-0.34 * bodyScale.shoulders, 0.72, 0]}>
        {/* Shoulder joint */}
        <mesh castShadow>
          <sphereGeometry args={[0.075, 24, 24]} />
          <meshStandardMaterial color={skinColor} roughness={0.65} />
        </mesh>
        {/* Upper arm */}
        <mesh position={[0, -0.14, 0]} castShadow>
          <cylinderGeometry args={[0.065, 0.058, 0.3, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.65} />
        </mesh>
        {/* Elbow */}
        <mesh position={[0, -0.3, 0]} castShadow>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.7} />
        </mesh>
        {/* Forearm */}
        <mesh position={[0, -0.44, 0]} castShadow>
          <cylinderGeometry args={[0.058, 0.048, 0.28, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.65} />
        </mesh>
        {/* Wrist */}
        <mesh position={[0, -0.59, 0]} castShadow>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.7} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.66, 0.02]} castShadow>
          <boxGeometry args={[0.09, 0.14, 0.04]} />
          <meshStandardMaterial color={skinColor} roughness={0.65} />
        </mesh>
        {/* Fingers */}
        {[-0.025, -0.008, 0.008, 0.025].map((x, i) => (
          <mesh key={`lfinger-${i}`} position={[x, -0.76, 0.03]} castShadow>
            <capsuleGeometry args={[0.012, 0.05, 6, 12]} />
            <meshStandardMaterial color={skinColor} roughness={0.65} />
          </mesh>
        ))}
      </group>

      <group position={[0.34 * bodyScale.shoulders, 0.72, 0]}>
        {/* Shoulder joint */}
        <mesh castShadow>
          <sphereGeometry args={[0.075, 24, 24]} />
          <meshStandardMaterial color={skinColor} roughness={0.65} />
        </mesh>
        {/* Upper arm */}
        <mesh position={[0, -0.14, 0]} castShadow>
          <cylinderGeometry args={[0.065, 0.058, 0.3, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.65} />
        </mesh>
        {/* Elbow */}
        <mesh position={[0, -0.3, 0]} castShadow>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.7} />
        </mesh>
        {/* Forearm */}
        <mesh position={[0, -0.44, 0]} castShadow>
          <cylinderGeometry args={[0.058, 0.048, 0.28, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.65} />
        </mesh>
        {/* Wrist */}
        <mesh position={[0, -0.59, 0]} castShadow>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.7} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.66, 0.02]} castShadow>
          <boxGeometry args={[0.09, 0.14, 0.04]} />
          <meshStandardMaterial color={skinColor} roughness={0.65} />
        </mesh>
        {/* Fingers */}
        {[-0.025, -0.008, 0.008, 0.025].map((x, i) => (
          <mesh key={`rfinger-${i}`} position={[x, -0.76, 0.03]} castShadow>
            <capsuleGeometry args={[0.012, 0.05, 6, 12]} />
            <meshStandardMaterial color={skinColor} roughness={0.65} />
          </mesh>
        ))}
      </group>

      {/* Hips */}
      <mesh position={[0, 0.22, 0]} castShadow>
        <capsuleGeometry args={[0.22 * bodyScale.hips, 0.16, 12, 32]} />
        <meshStandardMaterial color={skinColor} roughness={0.65} />
      </mesh>

      {/* Legs */}
      <group position={[-0.13 * bodyScale.hips, 0.08, 0]}>
        {/* Hip joint */}
        <mesh castShadow>
          <sphereGeometry args={[0.085, 24, 24]} />
          <meshStandardMaterial color={skinColor} roughness={0.65} />
        </mesh>
        {/* Thigh */}
        <mesh position={[0, -0.18, 0]} castShadow>
          <cylinderGeometry args={[0.095, 0.08, 0.42, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.65} />
        </mesh>
        {/* Knee */}
        <mesh position={[0, -0.4, 0]} castShadow>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.7} />
        </mesh>
        {/* Shin */}
        <mesh position={[0, -0.6, 0]} castShadow>
          <cylinderGeometry args={[0.075, 0.06, 0.4, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.65} />
        </mesh>
        {/* Ankle */}
        <mesh position={[0, -0.82, 0]} castShadow>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.7} />
        </mesh>
        {/* Foot */}
        <mesh position={[0, -0.88, 0.05]} castShadow>
          <boxGeometry args={[0.11, 0.06, 0.22]} />
          <meshStandardMaterial color={skinColor} roughness={0.7} />
        </mesh>
      </group>

      <group position={[0.13 * bodyScale.hips, 0.08, 0]}>
        {/* Hip joint */}
        <mesh castShadow>
          <sphereGeometry args={[0.085, 24, 24]} />
          <meshStandardMaterial color={skinColor} roughness={0.65} />
        </mesh>
        {/* Thigh */}
        <mesh position={[0, -0.18, 0]} castShadow>
          <cylinderGeometry args={[0.095, 0.08, 0.42, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.65} />
        </mesh>
        {/* Knee */}
        <mesh position={[0, -0.4, 0]} castShadow>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.7} />
        </mesh>
        {/* Shin */}
        <mesh position={[0, -0.6, 0]} castShadow>
          <cylinderGeometry args={[0.075, 0.06, 0.4, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.65} />
        </mesh>
        {/* Ankle */}
        <mesh position={[0, -0.82, 0]} castShadow>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.7} />
        </mesh>
        {/* Foot */}
        <mesh position={[0, -0.88, 0.05]} castShadow>
          <boxGeometry args={[0.11, 0.06, 0.22]} />
          <meshStandardMaterial color={skinColor} roughness={0.7} />
        </mesh>
      </group>

      {/* Clothing - attached to body properly */}
      {renderClothing()}
    </group>
  );

  function renderClothing() {
    const parts: React.ReactNode[] = [];
    
    // TOP CLOTHING
    const _topColor = new THREE.Color(avatar.topColor || '#3498db');
    const _topMaterial = new THREE.MeshStandardMaterial({ 
      color: _topColor, 
      roughness: 0.75,
      metalness: 0.05,
    });

    switch (avatar.topType) {
      case 'tshirt':
        parts.push(
          <mesh key="tshirt-body" position={[0, 0.55, 0]} castShadow>
            <capsuleGeometry args={[0.26 * bodyScale.torso, 0.44, 12, 32]} />
            <_topMaterial />
          </mesh>,
          <mesh key="tshirt-collar" position={[0, 0.78, 0.18]}>
            <torusGeometry args={[0.11, 0.018, 8, 32, Math.PI]} />
            <_topMaterial />
          </mesh>,
          <mesh key="sleeve-l" position={[-0.34 * bodyScale.shoulders, 0.65, 0]} castShadow>
            <cylinderGeometry args={[0.09, 0.07, 0.2, 16]} />
            <_topMaterial />
          </mesh>,
          <mesh key="sleeve-r" position={[0.34 * bodyScale.shoulders, 0.65, 0]} castShadow>
            <cylinderGeometry args={[0.09, 0.07, 0.2, 16]} />
            <_topMaterial />
          </mesh>
        );
        break;
      case 'hoodie':
        parts.push(
          <mesh key="hoodie-body" position={[0, 0.55, 0]} castShadow>
            <capsuleGeometry args={[0.28 * bodyScale.torso, 0.46, 12, 32]} />
            <_topMaterial />
          </mesh>,
          <mesh key="hoodie-back" position={[0, 0.72, -0.12]}>
            <sphereGeometry args={[0.16, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <_topMaterial />
          </mesh>,
          <mesh key="hoodie-pouch" position={[0, 0.38, 0.26]}>
            <boxGeometry args={[0.32, 0.18, 0.1]} />
            <_topMaterial />
          </mesh>
        );
        break;
      case 'buttonup':
        parts.push(
          <mesh key="shirt-l" position={[-0.13, 0.55, 0]} castShadow>
            <capsuleGeometry args={[0.14, 0.44, 12, 32]} />
            <_topMaterial />
          </mesh>,
          <mesh key="shirt-r" position={[0.13, 0.55, 0]} castShadow>
            <capsuleGeometry args={[0.14, 0.44, 12, 32]} />
            <_topMaterial />
          </mesh>,
          <mesh key="collar" position={[0, 0.78, 0.16]}>
            <torusGeometry args={[0.13, 0.025, 8, 32, Math.PI]} />
            <_topMaterial />
          </mesh>,
          <mesh key="buttons" position={[0, 0.55, 0.26]}>
            <boxGeometry args={[0.015, 0.38, 0.015]} />
            <meshStandardMaterial color="#2c3e50" roughness={0.3} metalness={0.6} />
          </mesh>
        );
        break;
      case 'tank':
        parts.push(
          <mesh key="tank" position={[0, 0.55, 0]} castShadow>
            <capsuleGeometry args={[0.24 * bodyScale.torso, 0.42, 12, 32]} />
            <_topMaterial />
          </mesh>
        );
        break;
      case 'jacket':
        parts.push(
          <mesh key="jacket" position={[0, 0.55, 0]} castShadow>
            <capsuleGeometry args={[0.29 * bodyScale.torso, 0.48, 12, 32]} />
            <_topMaterial />
          </mesh>,
          <mesh key="zipper" position={[0, 0.55, 0.27]}>
            <boxGeometry args={[0.018, 0.42, 0.015]} />
            <meshStandardMaterial color="#95a5a6" roughness={0.25} metalness={0.85} />
          </mesh>
        );
        break;
    }

    // BOTTOM CLOTHING
    const _bottomColor = new THREE.Color(avatar.bottomColor || '#2c3e50');
    const _bottomMaterial = new THREE.MeshStandardMaterial({ 
      color: _bottomColor, 
      roughness: 0.7,
      metalness: 0.05,
    });

    switch (avatar.bottomType) {
      case 'pants':
      case 'jeans':
        parts.push(
          <mesh key="pants-waist" position={[0, 0.24, 0]} castShadow>
            <capsuleGeometry args={[0.24 * bodyScale.hips, 0.12, 12, 32]} />
            <_bottomMaterial />
          </mesh>,
          <mesh key="leg-l" position={[-0.12, -0.02, 0]} castShadow>
            <cylinderGeometry args={[0.095, 0.08, 0.62, 16]} />
            <_bottomMaterial />
          </mesh>,
          <mesh key="leg-r" position={[0.12, -0.02, 0]} castShadow>
            <cylinderGeometry args={[0.095, 0.08, 0.62, 16]} />
            <_bottomMaterial />
          </mesh>,
          <mesh key="crotch" position={[0, 0.12, 0]} castShadow>
            <sphereGeometry args={[0.12, 24, 24]} />
            <_bottomMaterial />
          </mesh>
        );
        break;
      case 'shorts':
        parts.push(
          <mesh key="shorts-waist" position={[0, 0.24, 0]} castShadow>
            <capsuleGeometry args={[0.24 * bodyScale.hips, 0.08, 12, 32]} />
            <_bottomMaterial />
          </mesh>,
          <mesh key="thigh-l" position={[-0.12, 0.06, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.085, 0.25, 16]} />
            <_bottomMaterial />
          </mesh>,
          <mesh key="thigh-r" position={[0.12, 0.06, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.085, 0.25, 16]} />
            <_bottomMaterial />
          </mesh>
        );
        break;
      case 'skirt':
        parts.push(
          <mesh key="skirt" position={[0, 0.18, 0]} castShadow>
            <coneGeometry args={[0.32 * bodyScale.hips, 0.38, 32, 1, true]} />
            <_bottomMaterial side={THREE.DoubleSide} />
          </mesh>
        );
        break;
    }

    // SHOES
    const _shoeColor = new THREE.Color(avatar.shoeColor || '#ecf0f1');
    const _soleMaterial = new THREE.MeshStandardMaterial({ color: '#2c3e50', roughness: 0.9 });
    const _shoeMaterial = new THREE.MeshStandardMaterial({ 
      color: _shoeColor, 
      roughness: 0.55,
      metalness: 0.1,
    });

    switch (avatar.shoeType) {
      case 'sneakers':
        parts.push(
          <mesh key="sneaker-l" position={[-0.12, -0.88, 0.05]} castShadow>
            <boxGeometry args={[0.13, 0.1, 0.24]} />
            <_shoeMaterial />
          </mesh>,
          <mesh key="sneaker-r" position={[0.12, -0.88, 0.05]} castShadow>
            <boxGeometry args={[0.13, 0.1, 0.24]} />
            <_shoeMaterial />
          </mesh>,
          <mesh key="sole-l" position={[-0.12, -0.94, 0.05]}>
            <boxGeometry args={[0.135, 0.03, 0.25]} />
            <_soleMaterial />
          </mesh>,
          <mesh key="sole-r" position={[0.12, -0.94, 0.05]}>
            <boxGeometry args={[0.135, 0.03, 0.25]} />
            <_soleMaterial />
          </mesh>
        );
        break;
      case 'boots':
        parts.push(
          <mesh key="boot-l" position={[-0.12, -0.82, 0.05]} castShadow>
            <cylinderGeometry args={[0.08, 0.09, 0.22, 16]} />
            <_shoeMaterial />
          </mesh>,
          <mesh key="boot-r" position={[0.12, -0.82, 0.05]} castShadow>
            <cylinderGeometry args={[0.08, 0.09, 0.22, 16]} />
            <_shoeMaterial />
          </mesh>
        );
        break;
      case 'sandals':
        parts.push(
          <mesh key="sandal-l" position={[-0.12, -0.9, 0.05]} castShadow>
            <boxGeometry args={[0.12, 0.04, 0.22]} />
            <_shoeMaterial />
          </mesh>,
          <mesh key="sandal-r" position={[0.12, -0.9, 0.05]} castShadow>
            <boxGeometry args={[0.12, 0.04, 0.22]} />
            <_shoeMaterial />
          </mesh>
        );
        break;
      case 'formal':
        parts.push(
          <mesh key="formal-l" position={[-0.12, -0.88, 0.05]} castShadow>
            <boxGeometry args={[0.12, 0.08, 0.24]} />
            <_shoeMaterial />
          </mesh>,
          <mesh key="formal-r" position={[0.12, -0.88, 0.05]} castShadow>
            <boxGeometry args={[0.12, 0.08, 0.24]} />
            <_shoeMaterial />
          </mesh>
        );
        break;
    }

    // ACCESSORIES
    if (avatar.accessory === 'glasses') {
      const _glassMaterial = new THREE.MeshStandardMaterial({ color: '#2c3e50', roughness: 0.25, metalness: 0.85 });
      parts.push(
        <group key="glasses" position={[0, 0.1, 0.44]}>
          <mesh position={[-0.16, 0, 0]}>
            <circleGeometry args={[0.07, 32]} />
            <_glassMaterial />
          </mesh>
          <mesh position={[0.16, 0, 0]}>
            <circleGeometry args={[0.07, 32]} />
            <_glassMaterial />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <boxGeometry args={[0.1, 0.012, 0.012]} />
            <_glassMaterial />
          </mesh>
          <mesh position={[-0.26, 0.02, -0.02]} rotation={[0, 0, 0.25]}>
            <boxGeometry args={[0.12, 0.012, 0.012]} />
            <_glassMaterial />
          </mesh>
          <mesh position={[0.26, 0.02, -0.02]} rotation={[0, 0, -0.25]}>
            <boxGeometry args={[0.12, 0.012, 0.012]} />
            <_glassMaterial />
          </mesh>
        </group>
      );
    }
    
    if (avatar.accessory === 'sunglasses') {
      const _lensMaterial = new THREE.MeshStandardMaterial({ color: '#1a1a1a', roughness: 0.05, metalness: 0.95 });
      parts.push(
        <group key="sunglasses" position={[0, 0.1, 0.44]}>
          <mesh position={[-0.16, 0, 0]}>
            <boxGeometry args={[0.15, 0.1, 0.04]} />
            <_lensMaterial />
          </mesh>
          <mesh position={[0.16, 0, 0]}>
            <boxGeometry args={[0.15, 0.1, 0.04]} />
            <_lensMaterial />
          </mesh>
          <mesh position={[0, 0.02, 0.015]}>
            <boxGeometry args={[0.08, 0.018, 0.015]} />
            <_lensMaterial />
          </mesh>
        </group>
      );
    }
    
    if (avatar.accessory === 'hat') {
      const _hatMaterial = new THREE.MeshStandardMaterial({ color: '#e74c3c', roughness: 0.65 });
      parts.push(
        <group key="hat" position={[0, 0.38, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.28, 0.28, 0.1, 32]} />
            <_hatMaterial />
          </mesh>
          <mesh position={[0, 0.07, 0]} castShadow>
            <cylinderGeometry args={[0.2, 0.2, 0.14, 32]} />
            <_hatMaterial />
          </mesh>
          <mesh position={[0, 0.03, 0.26]} castShadow>
            <boxGeometry args={[0.42, 0.04, 0.1]} />
            <_hatMaterial />
          </mesh>
          <mesh position={[0, 0.02, 0]} castShadow>
            <torusGeometry args={[0.2, 0.02, 8, 32]} />
            <meshStandardMaterial color="#c0392b" roughness={0.7} />
          </mesh>
        </group>
      );
    }
    
    if (avatar.accessory === 'earrings') {
      const _goldMaterial = new THREE.MeshStandardMaterial({ color: '#f1c40f', metalness: 0.95, roughness: 0.08 });
      parts.push(
        <mesh key="earring-l" position={[-0.49, -0.1, 0]} castShadow>
          <torusGeometry args={[0.028, 0.006, 12, 24]} />
          <_goldMaterial />
        </mesh>,
        <mesh key="earring-r" position={[0.49, -0.1, 0]} castShadow>
          <torusGeometry args={[0.028, 0.006, 12, 24]} />
          <_goldMaterial />
        </mesh>
      );
    }
    
    if (avatar.accessory === 'necklace') {
      const _goldMaterial2 = new THREE.MeshStandardMaterial({ color: '#f1c40f', metalness: 0.95, roughness: 0.08 });
      parts.push(
        <mesh key="necklace-chain" position={[0, 0.74, 0.18]} rotation={[Math.PI / 2.5, 0, 0]}>
          <torusGeometry args={[0.14, 0.006, 8, 32]} />
          <_goldMaterial2 />
        </mesh>,
        <mesh key="necklace-pendant" position={[0, 0.62, 0.28]}>
          <sphereGeometry args={[0.03, 24, 24]} />
          <_goldMaterial2 />
        </mesh>
      );
    }

    return parts;
  }
}
