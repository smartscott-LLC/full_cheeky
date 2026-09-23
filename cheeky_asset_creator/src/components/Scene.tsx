'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Grid, Stars } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import Avatar from './Avatar';
import * as THREE from 'three';

function FloatingParticles() {
  const meshRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const count = 100;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = Math.random() * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes.position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#818cf8" transparent opacity={0.6} />
    </points>
  );
}

export default function Scene() {
  return (
    <Canvas
      shadows
      gl={{ 
        antialias: true, 
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      camera={{ 
        position: new THREE.Vector3(0, 1.6, 5.5), 
        fov: 40,
        near: 0.1,
        far: 100
      }}
    >
      {/* Background gradient effect */}
      <color attach="background" args={['#1a1a2e']} />
      <fog attach="fog" args={['#1a1a2e', 8, 25]} />
      
      {/* Ambient light */}
      <ambientLight intensity={0.35} color="#e8e8f0" />
      
      {/* Key light - main directional */}
      <directionalLight
        position={new THREE.Vector3(5, 8, 5)}
        intensity={1.4}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-bias={-0.0001}
      >
        <orthographicCamera attach="shadow-camera" args={[-5, 5, 5, -5, 0.5, 50]} />
      </directionalLight>
      
      {/* Fill light - softer from opposite side */}
      <directionalLight
        position={new THREE.Vector3(-4, 4, -3)}
        intensity={0.6}
        color="#b8d4e8"
      />
      
      {/* Rim light - back light for edge definition */}
      <directionalLight
        position={new THREE.Vector3(0, 3, -5)}
        intensity={0.5}
        color="#c4b5fd"
      />
      
      {/* Warm accent light */}
      <pointLight 
        position={new THREE.Vector3(2, 2, 3)} 
        intensity={0.25} 
        color="#ffd4a8"
        distance={8}
      />
      
      {/* Cool accent light */}
      <pointLight 
        position={new THREE.Vector3(-2, 1.5, 2)} 
        intensity={0.2} 
        color="#a8d8ea"
        distance={6}
      />
      
      <Suspense fallback={null}>
        <Avatar />
        
        {/* Environment reflections */}
        <Environment preset="studio" />
        
        {/* Contact shadows */}
        <ContactShadows
          position={new THREE.Vector3(0, -0.48, 0)}
          opacity={0.6}
          scale={12}
          blur={3}
          far={5}
          resolution={512}
        />
        
        {/* Ground grid */}
        <Grid
          position={new THREE.Vector3(0, -0.5, 0)}
          args={[15, 15]}
          cellSize={0.4}
          cellThickness={0.5}
          cellColor="#4a4a6a"
          sectionSize={2}
          sectionThickness={1.2}
          sectionColor="#6b6b9a"
          fadeDistance={18}
          fadeStrength={1.2}
          infiniteGrid={false}
        />
        
        {/* Floating particles */}
        <FloatingParticles />
      </Suspense>
      
      {/* Camera controls */}
      <OrbitControls
        enableDamping
        dampingFactor={0.06}
        minDistance={3}
        maxDistance={14}
        maxPolarAngle={Math.PI / 2 + 0.08}
        minPolarAngle={0.2}
        target={new THREE.Vector3(0, 0.9, 0)}
        autoRotate={false}
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}
