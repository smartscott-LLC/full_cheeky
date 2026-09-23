'use client';

import { useAvatar } from '@/contexts/AvatarContext';
import * as THREE from 'three';

export function AvatarHead() {
  const { avatar, getSkinColor } = useAvatar();

  const skinColor = getSkinColor();
  const hairColor = ['black', 'brown', 'blonde', 'red', 'auburn', 'white', 'gray'].includes(avatar.hairColor) 
    ? avatar.hairColor 
    : '#1a1a1a';

  const faceScale = new THREE.Vector3(
    avatar.faceType === 'round' ? 1.1 : avatar.faceType === 'oval' ? 0.9 : avatar.faceType === 'square' ? 1.05 : 1.0,
    avatar.faceType === 'round' ? 1.0 : avatar.faceType === 'oval' ? 1.15 : avatar.faceType === 'square' ? 0.95 : 1.05,
    avatar.faceType === 'round' ? 1.0 : avatar.faceType === 'oval' ? 1.0 : avatar.faceType === 'square' ? 1.05 : 0.95
  );

  return (
    <group position={[0, 1.65, 0]}>
      {/* Head */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial 
          color={skinColor} 
          roughness={0.7}
          metalness={0.05}
        />
      </mesh>
      
      {/* Face shape modifier */}
      <mesh scale={faceScale} castShadow>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshStandardMaterial 
          color={skinColor} 
          roughness={0.6}
          metalness={0.02}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Eyes */}
      <group position={[0, 0.08, 0.38]}>
        {/* Left eye white */}
        <mesh position={new THREE.Vector3(-0.14, 0, 0)}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="white" roughness={0.1} />
        </mesh>
        {/* Left iris */}
        <mesh position={new THREE.Vector3(-0.14, 0, 0.05)}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial 
            color="#4a3728" 
            roughness={0.2}
          />
        </mesh>
        {/* Left pupil */}
        <mesh position={new THREE.Vector3(-0.14, 0, 0.08)}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>

        {/* Right eye white */}
        <mesh position={new THREE.Vector3(0.14, 0, 0)}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="white" roughness={0.1} />
        </mesh>
        {/* Right iris */}
        <mesh position={new THREE.Vector3(0.14, 0, 0.05)}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial 
            color="#4a3728" 
            roughness={0.2}
          />
        </mesh>
        {/* Right pupil */}
        <mesh position={new THREE.Vector3(0.14, 0, 0.08)}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>

        {/* Eyebrows */}
        <mesh position={new THREE.Vector3(-0.14, 0.12, 0.36)} rotation={[0, 0, -0.1]}>
          <boxGeometry args={[0.12, 0.025, 0.02]} />
          <meshStandardMaterial color={hairColor} roughness={0.8} />
        </mesh>
        <mesh position={new THREE.Vector3(0.14, 0.12, 0.36)} rotation={[0, 0, 0.1]}>
          <boxGeometry args={[0.12, 0.025, 0.02]} />
          <meshStandardMaterial color={hairColor} roughness={0.8} />
        </mesh>
      </group>

      {/* Nose */}
      <mesh position={new THREE.Vector3(0, -0.02, 0.42)}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color={skinColor} roughness={0.7} />
      </mesh>

      {/* Mouth */}
      <mesh position={new THREE.Vector3(0, -0.12, 0.4)} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.06, 0.015, 8, 16, Math.PI]} />
        <meshStandardMaterial 
          color="#c0392b" 
          roughness={0.5}
        />
      </mesh>

      {/* Ears */}
      <mesh position={new THREE.Vector3(-0.44, 0, 0)} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color={skinColor} roughness={0.7} />
      </mesh>
      <mesh position={new THREE.Vector3(0.44, 0, 0)} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color={skinColor} roughness={0.7} />
      </mesh>

      {/* Hair */}
      {renderHair(avatar.hairStyle, hairColor)}
    </group>
  );

  function renderHair(style: string, color: string) {
    switch (style) {
      case 'short':
        return (
          <group>
            <mesh position={new THREE.Vector3(0, 0.15, 0)} castShadow>
              <sphereGeometry args={[0.47, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshStandardMaterial color={color} roughness={0.8} />
            </mesh>
            <mesh position={new THREE.Vector3(0, 0.08, 0.15)} castShadow>
              <boxGeometry args={[0.7, 0.15, 0.5]} />
              <meshStandardMaterial color={color} roughness={0.8} />
            </mesh>
          </group>
        );
      case 'medium':
        return (
          <group>
            <mesh position={new THREE.Vector3(0, 0.12, 0)} castShadow>
              <sphereGeometry args={[0.48, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2 + 0.3]} />
              <meshStandardMaterial color={color} roughness={0.8} />
            </mesh>
            <mesh position={new THREE.Vector3(-0.48, -0.05, 0)} castShadow>
              <cylinderGeometry args={[0.08, 0.06, 0.25, 8]} />
              <meshStandardMaterial color={color} roughness={0.8} />
            </mesh>
            <mesh position={new THREE.Vector3(0.48, -0.05, 0)} castShadow>
              <cylinderGeometry args={[0.08, 0.06, 0.25, 8]} />
              <meshStandardMaterial color={color} roughness={0.8} />
            </mesh>
          </group>
        );
      case 'long':
        return (
          <group>
            <mesh position={new THREE.Vector3(0, 0.12, 0)} castShadow>
              <sphereGeometry args={[0.48, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2 + 0.3]} />
              <meshStandardMaterial color={color} roughness={0.8} />
            </mesh>
            <mesh position={new THREE.Vector3(-0.5, -0.2, -0.1)} castShadow>
              <cylinderGeometry args={[0.1, 0.05, 0.5, 8]} />
              <meshStandardMaterial color={color} roughness={0.8} />
            </mesh>
            <mesh position={new THREE.Vector3(0.5, -0.2, -0.1)} castShadow>
              <cylinderGeometry args={[0.1, 0.05, 0.5, 8]} />
              <meshStandardMaterial color={color} roughness={0.8} />
            </mesh>
            <mesh position={new THREE.Vector3(0, -0.3, -0.15)} castShadow>
              <boxGeometry args={[0.8, 0.4, 0.15]} />
              <meshStandardMaterial color={color} roughness={0.8} />
            </mesh>
          </group>
        );
      case 'mohawk':
        return (
          <group>
            <mesh position={new THREE.Vector3(0, 0.25, 0)} castShadow>
              <boxGeometry args={[0.15, 0.25, 0.6]} />
              <meshStandardMaterial color={color} roughness={0.7} />
            </mesh>
            <mesh position={new THREE.Vector3(0, 0.12, 0)} castShadow>
              <sphereGeometry args={[0.46, 32, 32, 0, Math.PI * 2, 0, Math.PI / 3]} />
              <meshStandardMaterial color={color} roughness={0.8} />
            </mesh>
          </group>
        );
      case 'buzz':
        return (
          <group>
            <mesh position={new THREE.Vector3(0, 0.1, 0)} castShadow>
              <sphereGeometry args={[0.46, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2 + 0.15]} />
              <meshStandardMaterial color={color} roughness={0.85} />
            </mesh>
          </group>
        );
      case 'curly':
        return (
          <group>
            <mesh position={new THREE.Vector3(0, 0.15, 0)} castShadow>
              <sphereGeometry args={[0.52, 32, 32]} />
              <meshStandardMaterial color={color} roughness={0.8} />
            </mesh>
            {[
              new THREE.Vector3(-0.3, 0.2, 0),
              new THREE.Vector3(0.3, 0.2, 0),
              new THREE.Vector3(-0.2, 0.35, 0),
              new THREE.Vector3(0.2, 0.35, 0),
              new THREE.Vector3(0, 0.4, 0)
            ].map((pos, i) => (
              <mesh key={i} position={pos} castShadow>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshStandardMaterial color={color} roughness={0.8} />
              </mesh>
            ))}
          </group>
        );
      case 'afro':
        return (
          <group>
            <mesh position={new THREE.Vector3(0, 0.18, 0)} castShadow>
              <sphereGeometry args={[0.58, 32, 32]} />
              <meshStandardMaterial color={color} roughness={0.85} />
            </mesh>
          </group>
        );
      case 'ponytail':
        return (
          <group>
            <mesh position={new THREE.Vector3(0, 0.15, 0)} castShadow>
              <sphereGeometry args={[0.48, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2 + 0.2]} />
              <meshStandardMaterial color={color} roughness={0.8} />
            </mesh>
            <mesh position={new THREE.Vector3(0, 0.1, -0.45)} castShadow>
              <cylinderGeometry args={[0.08, 0.04, 0.35, 8]} />
              <meshStandardMaterial color={color} roughness={0.8} />
            </mesh>
            <mesh position={new THREE.Vector3(0, 0.25, -0.5)} castShadow>
              <sphereGeometry args={[0.06, 16, 16]} />
              <meshStandardMaterial color={color} roughness={0.8} />
            </mesh>
          </group>
        );
      default:
        return null;
    }
  }
}
