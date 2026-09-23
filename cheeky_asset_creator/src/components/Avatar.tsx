'use client';

import { AvatarHead } from './avatar/AvatarHead';
import { AvatarBody } from './avatar/AvatarBody';
import * as THREE from 'three';

export default function Avatar() {
  return (
    <group position={new THREE.Vector3(0, 0, 0)}>
      <AvatarHead />
      <AvatarBody />
    </group>
  );
}
