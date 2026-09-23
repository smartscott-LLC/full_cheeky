'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Grid } from '@react-three/drei';
import { Suspense } from 'react';
import Avatar from './Avatar';
import * as THREE from 'three';

export default function Scene() {
  return (
    <Canvas
      camera={{ position: new THREE.Vector3(0, 1.5, 5), fov: 45 }}
      shadows
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      
      <directionalLight
        position={new THREE.Vector3(5, 8, 5)}
        intensity={1.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
      
      <directionalLight
        position={new THREE.Vector3(-5, 5, -5)}
        intensity={0.5}
        color="#a8d8ea"
      />
      
      <pointLight position={new THREE.Vector3(0, 3, 2)} intensity={0.3} color="#ffeaa7" />
      
      <Suspense fallback={null}>
        <Avatar />
        
        <Environment preset="studio" />
        
        <ContactShadows
          position={new THREE.Vector3(0, -0.5, 0)}
          opacity={0.5}
          scale={10}
          blur={2.5}
          far={4}
        />
        
        <Grid
          position={new THREE.Vector3(0, -0.51, 0)}
          args={[10, 10]}
          cellSize={0.5}
          cellThickness={0.5}
          cellColor="#6b7280"
          sectionSize={2.5}
          sectionThickness={1}
          sectionColor="#4b5563"
          fadeDistance={20}
          fadeStrength={1}
        />
      </Suspense>
      
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={2.5}
        maxDistance={12}
        maxPolarAngle={Math.PI / 2 + 0.1}
        target={new THREE.Vector3(0, 1, 0)}
      />
    </Canvas>
  );
}
