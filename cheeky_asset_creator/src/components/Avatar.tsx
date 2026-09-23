'use client';

import { AvatarHead } from './avatar/AvatarHead';
import { AvatarBody } from './avatar/AvatarBody';

export default function Avatar() {
  return (
    <group position={[0, 0, 0]}>
      <AvatarHead />
      <AvatarBody />
    </group>
  );
}
