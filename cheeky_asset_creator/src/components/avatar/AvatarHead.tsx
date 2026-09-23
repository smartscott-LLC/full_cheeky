'use client';

import { useMemo } from 'react';
import { useAvatar } from '@/contexts/AvatarContext';
import * as THREE from 'three';

export function AvatarHead() {
  const { avatar, getSkinColor, getHairColor } = useAvatar();

  const skinColor = useMemo(() => new THREE.Color(getSkinColor()), [getSkinColor]);
  const hairColor = useMemo(() => new THREE.Color(getHairColor()), [getHairColor]);

  const faceScale = useMemo(() => {
    const scales = {
      round: { x: 1.15, y: 0.95, z: 1.05 },
      oval: { x: 0.88, y: 1.18, z: 0.98 },
      square: { x: 1.08, y: 0.92, z: 1.08 },
      heart: { x: 0.95, y: 1.08, z: 0.92 },
    };
    const s = scales[avatar.faceType];
    return new THREE.Vector3(s.x, s.y, s.z);
  }, [avatar.faceType]);

  return (
    <group position={[0, 1.72, 0]}>
      {/* Main head - higher poly for smoother shape */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.48, 64, 64]} />
        <meshStandardMaterial 
          color={skinColor} 
          roughness={0.65}
          metalness={0.02}
          clearcoat={0.1}
          clearcoatRoughness={0.4}
        />
      </mesh>
      
      {/* Face shape modifier */}
      <mesh scale={faceScale} castShadow>
        <sphereGeometry args={[0.44, 64, 64]} />
        <meshStandardMaterial 
          color={skinColor} 
          roughness={0.55}
          metalness={0.01}
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Forehead detail */}
      <mesh position={[0, 0.18, 0.35]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color={skinColor} roughness={0.7} />
      </mesh>

      {/* Eyes - larger, more expressive */}
      <group position={[0, 0.1, 0.4]}>
        {/* Left eye socket */}
        <mesh position={[-0.16, 0, 0]}>
          <sphereGeometry args={[0.11, 32, 32]} />
          <meshStandardMaterial color="white" roughness={0.15} />
        </mesh>
        {/* Left iris */}
        <mesh position={[-0.16, 0, 0.07]}>
          <sphereGeometry args={[0.06, 32, 32]} />
          <meshStandardMaterial 
            color="#4a3728" 
            roughness={0.25}
          />
        </mesh>
        {/* Left pupil */}
        <mesh position={[-0.16, 0, 0.1]}>
          <sphereGeometry args={[0.032, 32, 32]} />
          <meshStandardMaterial color="black" roughness={0.1} />
        </mesh>
        {/* Left eye highlight */}
        <mesh position={[-0.14, 0.03, 0.12]}>
          <sphereGeometry args={[0.012, 16, 16]} />
          <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.8} />
        </mesh>

        {/* Right eye socket */}
        <mesh position={[0.16, 0, 0]}>
          <sphereGeometry args={[0.11, 32, 32]} />
          <meshStandardMaterial color="white" roughness={0.15} />
        </mesh>
        {/* Right iris */}
        <mesh position={[0.16, 0, 0.07]}>
          <sphereGeometry args={[0.06, 32, 32]} />
          <meshStandardMaterial 
            color="#4a3728" 
            roughness={0.25}
          />
        </mesh>
        {/* Right pupil */}
        <mesh position={[0.16, 0, 0.1]}>
          <sphereGeometry args={[0.032, 32, 32]} />
          <meshStandardMaterial color="black" roughness={0.1} />
        </mesh>
        {/* Right eye highlight */}
        <mesh position={[0.18, 0.03, 0.12]}>
          <sphereGeometry args={[0.012, 16, 16]} />
          <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.8} />
        </mesh>

        {/* Eyelids */}
        <mesh position={[-0.16, 0.06, 0.08]} rotation={[0.2, 0, 0]}>
          <sphereGeometry args={[0.115, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
          <meshStandardMaterial color={skinColor} roughness={0.65} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0.16, 0.06, 0.08]} rotation={[0.2, 0, 0]}>
          <sphereGeometry args={[0.115, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
          <meshStandardMaterial color={skinColor} roughness={0.65} side={THREE.DoubleSide} />
        </mesh>

        {/* Eyebrows - thicker, more expressive */}
        <mesh position={[-0.16, 0.16, 0.38]} rotation={[0, 0, -0.08]}>
          <boxGeometry args={[0.16, 0.035, 0.04]} />
          <meshStandardMaterial color={hairColor} roughness={0.85} />
        </mesh>
        <mesh position={[0.16, 0.16, 0.38]} rotation={[0, 0, 0.08]}>
          <boxGeometry args={[0.16, 0.035, 0.04]} />
          <meshStandardMaterial color={hairColor} roughness={0.85} />
        </mesh>
      </group>

      {/* Nose - more defined */}
      <group position={[0, -0.02, 0.44]}>
        {/* Nose bridge */}
        <mesh position={[0, 0.06, 0]}>
          <capsuleGeometry args={[0.045, 0.12, 8, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.7} />
        </mesh>
        {/* Nose tip */}
        <mesh position={[0, -0.02, 0.04]}>
          <sphereGeometry args={[0.055, 32, 32]} />
          <meshStandardMaterial color={skinColor} roughness={0.65} />
        </mesh>
        {/* Nostrils */}
        <mesh position={[-0.04, -0.04, 0.06]}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshStandardMaterial color={skinColor.clone().multiplyScalar(0.85)} roughness={0.8} />
        </mesh>
        <mesh position={[0.04, -0.04, 0.06]}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshStandardMaterial color={skinColor.clone().multiplyScalar(0.85)} roughness={0.8} />
        </mesh>
      </group>

      {/* Mouth - fuller lips */}
      <group position={[0, -0.14, 0.42]}>
        {/* Upper lip */}
        <mesh position={[0, 0.02, 0]}>
          <torusGeometry args={[0.07, 0.025, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#c0392b" roughness={0.5} />
        </mesh>
        {/* Lower lip */}
        <mesh position={[0, -0.02, 0.01]}>
          <sphereGeometry args={[0.065, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          <meshStandardMaterial color="#c0392b" roughness={0.45} />
        </mesh>
        {/* Mouth line */}
        <mesh position={[0, 0, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.068, 0.008, 8, 32, Math.PI]} />
          <meshStandardMaterial color="#922b21" roughness={0.6} />
        </mesh>
      </group>

      {/* Ears - more detailed */}
      <mesh position={[-0.48, 0, 0]} castShadow>
        <capsuleGeometry args={[0.09, 0.18, 8, 16]} />
        <meshStandardMaterial color={skinColor} roughness={0.65} />
      </mesh>
      <mesh position={[0.48, 0, 0]} castShadow>
        <capsuleGeometry args={[0.09, 0.18, 8, 16]} />
        <meshStandardMaterial color={skinColor} roughness={0.65} />
      </mesh>
      {/* Inner ear details */}
      <mesh position={[-0.46, 0, 0.04]} rotation={[0, 0, Math.PI / 2]}>
        <circleGeometry args={[0.06, 32]} />
        <meshStandardMaterial color={skinColor.clone().multiplyScalar(0.9)} roughness={0.7} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.46, 0, 0.04]} rotation={[0, 0, Math.PI / 2]}>
        <circleGeometry args={[0.06, 32]} />
        <meshStandardMaterial color={skinColor.clone().multiplyScalar(0.9)} roughness={0.7} side={THREE.DoubleSide} />
      </mesh>

      {/* Hair */}
      {renderHair(avatar.hairStyle, hairColor)}
    </group>
  );

  function renderHair(style: string, color: THREE.Color) {
    const _hairMaterial = new THREE.MeshStandardMaterial({ 
      color, 
      roughness: 0.75, 
      metalness: 0.05,
      clearcoat: 0.2,
      clearcoatRoughness: 0.6
    });

    switch (style) {
      case 'short':
        return (
          <group>
            {/* Hair base */}
            <mesh position={[0, 0.18, 0]} castShadow>
              <sphereGeometry args={[0.5, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2 + 0.15]} />
              <_hairMaterial />
            </mesh>
            {/* Front bangs */}
            <mesh position={[0, 0.12, 0.38]} castShadow>
              <boxGeometry args={[0.85, 0.18, 0.25]} />
              <_hairMaterial />
            </mesh>
            {/* Side hair */}
            <mesh position={[-0.48, 0.05, 0]} castShadow>
              <capsuleGeometry args={[0.1, 0.22, 8, 16]} />
              <_hairMaterial />
            </mesh>
            <mesh position={[0.48, 0.05, 0]} castShadow>
              <capsuleGeometry args={[0.1, 0.22, 8, 16]} />
              <_hairMaterial />
            </mesh>
          </group>
        );
      case 'medium':
        return (
          <group>
            <mesh position={[0, 0.15, 0]} castShadow>
              <sphereGeometry args={[0.51, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2 + 0.25]} />
              <_hairMaterial />
            </mesh>
            <mesh position={[-0.52, -0.02, 0.05]} castShadow>
              <capsuleGeometry args={[0.09, 0.32, 8, 16]} />
              <_hairMaterial />
            </mesh>
            <mesh position={[0.52, -0.02, 0.05]} castShadow>
              <capsuleGeometry args={[0.09, 0.32, 8, 16]} />
              <_hairMaterial />
            </mesh>
            <mesh position={[-0.52, -0.02, 0.05]} rotation={[0, 0, 0.15]}>
              <capsuleGeometry args={[0.08, 0.28, 8, 16]} />
              <_hairMaterial />
            </mesh>
            <mesh position={[0.52, -0.02, 0.05]} rotation={[0, 0, -0.15]}>
              <capsuleGeometry args={[0.08, 0.28, 8, 16]} />
              <_hairMaterial />
            </mesh>
          </group>
        );
      case 'long':
        return (
          <group>
            <mesh position={[0, 0.15, 0]} castShadow>
              <sphereGeometry args={[0.52, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2 + 0.3]} />
              <_hairMaterial />
            </mesh>
            <mesh position={[-0.55, -0.15, -0.08]} castShadow>
              <capsuleGeometry args={[0.1, 0.55, 8, 16]} />
              <_hairMaterial />
            </mesh>
            <mesh position={[0.55, -0.15, -0.08]} castShadow>
              <capsuleGeometry args={[0.1, 0.55, 8, 16]} />
              <_hairMaterial />
            </mesh>
            <mesh position={[0, -0.25, -0.18]} castShadow>
              <boxGeometry args={[0.9, 0.5, 0.15]} />
              <_hairMaterial />
            </mesh>
            {/* Hair strands detail */}
            {[0, 0.15, -0.15].map((x, i) => (
              <mesh key={i} position={[x - 0.15, -0.35, -0.22]} castShadow>
                <capsuleGeometry args={[0.04, 0.25, 6, 12]} />
                <_hairMaterial />
              </mesh>
            ))}
          </group>
        );
      case 'mohawk':
        return (
          <group>
            <mesh position={[0, 0.15, 0]} castShadow>
              <sphereGeometry args={[0.48, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2.5]} />
              <_hairMaterial />
            </mesh>
            <mesh position={[0, 0.32, 0]} castShadow>
              <boxGeometry args={[0.18, 0.32, 0.65]} />
              <_hairMaterial />
            </mesh>
            {/* Fade sides */}
            <mesh position={[-0.46, 0.05, 0]} castShadow>
              <sphereGeometry args={[0.12, 32, 32]} />
              <_hairMaterial />
            </mesh>
            <mesh position={[0.46, 0.05, 0]} castShadow>
              <sphereGeometry args={[0.12, 32, 32]} />
              <_hairMaterial />
            </mesh>
          </group>
        );
      case 'buzz':
        return (
          <group>
            <mesh position={[0, 0.12, 0]} castShadow>
              <sphereGeometry args={[0.49, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2 + 0.2]} />
              <meshStandardMaterial color={color} roughness={0.9} metalness={0.05} />
            </mesh>
          </group>
        );
      case 'curly':
        return (
          <group>
            <mesh position={[0, 0.18, 0]} castShadow>
              <sphereGeometry args={[0.56, 64, 64]} />
              <_hairMaterial />
            </mesh>
            {/* Curly bumps */}
            {[
              [-0.35, 0.25, 0], [0.35, 0.25, 0],
              [-0.25, 0.38, 0], [0.25, 0.38, 0],
              [0, 0.42, 0],
              [-0.42, 0.12, 0], [0.42, 0.12, 0],
              [-0.38, -0.02, 0.15], [0.38, -0.02, 0.15]
            ].map((pos, i) => (
              <mesh key={i} position={new THREE.Vector3(pos[0], pos[1], pos[2])} castShadow>
                <sphereGeometry args={[0.11, 24, 24]} />
                <_hairMaterial />
              </mesh>
            ))}
          </group>
        );
      case 'afro':
        return (
          <group>
            <mesh position={[0, 0.2, 0]} castShadow>
              <sphereGeometry args={[0.62, 64, 64]} />
              <_hairMaterial />
            </mesh>
            {/* Texture bumps */}
            {[
              [-0.4, 0.25, 0], [0.4, 0.25, 0],
              [-0.3, 0.45, 0], [0.3, 0.45, 0],
              [0, 0.52, 0],
              [-0.48, 0.08, 0], [0.48, 0.08, 0],
              [-0.35, -0.08, 0.2], [0.35, -0.08, 0.2]
            ].map((pos, i) => (
              <mesh key={i} position={new THREE.Vector3(pos[0], pos[1], pos[2])} castShadow>
                <sphereGeometry args={[0.13, 20, 20]} />
                <_hairMaterial />
              </mesh>
            ))}
          </group>
        );
      case 'ponytail':
        return (
          <group>
            <mesh position={[0, 0.15, 0]} castShadow>
              <sphereGeometry args={[0.51, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2 + 0.25]} />
              <_hairMaterial />
            </mesh>
            {/* Ponytail */}
            <mesh position={[0, 0.05, -0.52]} castShadow>
              <cylinderGeometry args={[0.12, 0.06, 0.45, 16]} />
              <_hairMaterial />
            </mesh>
            <mesh position={[0, -0.18, -0.65]} castShadow>
              <sphereGeometry args={[0.08, 24, 24]} />
              <_hairMaterial />
            </mesh>
            {/* Hair tie */}
            <mesh position={[0, 0.22, -0.42]} castShadow>
              <torusGeometry args={[0.13, 0.02, 8, 24]} />
              <meshStandardMaterial color="#2c3e50" roughness={0.6} />
            </mesh>
          </group>
        );
      default:
        return null;
    }
  }
}
