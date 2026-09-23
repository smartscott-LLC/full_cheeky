'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export type BodyType = 'slim' | 'average' | 'muscular' | 'heavy';
export type FaceType = 'round' | 'oval' | 'square' | 'heart';
export type SkinTone = 'fair' | 'light' | 'medium' | 'olive' | 'brown' | 'dark';
export type HairStyle = 'short' | 'medium' | 'long' | 'mohawk' | 'buzz' | 'curly' | 'afro' | 'ponytail';
export type HairColor = 'black' | 'brown' | 'blonde' | 'red' | 'auburn' | 'white' | 'gray' | 'blue' | 'pink' | 'purple';
export type TopType = 'tshirt' | 'hoodie' | 'buttonup' | 'tank' | 'jacket';
export type BottomType = 'pants' | 'shorts' | 'skirt' | 'jeans';
export type ShoeType = 'sneakers' | 'boots' | 'sandals' | 'formal';
export type AccessoryType = 'none' | 'glasses' | 'sunglasses' | 'hat' | 'earrings' | 'necklace';

export interface AvatarConfig {
  bodyType: BodyType;
  faceType: FaceType;
  skinTone: SkinTone;
  hairStyle: HairStyle;
  hairColor: HairColor;
  topType: TopType;
  topColor: string;
  bottomType: BottomType;
  bottomColor: string;
  shoeType: ShoeType;
  shoeColor: string;
  accessory: AccessoryType;
  name: string;
}

const skinToneColors: Record<SkinTone, string> = {
  fair: '#FDEBD0',
  light: '#F5CBA7',
  medium: '#E0AC69',
  olive: '#C4A882',
  brown: '#8D5524',
  dark: '#5D4037',
};

const hairColorMap: Record<HairColor, string> = {
  black: '#1a1a1a',
  brown: '#4a3728',
  blonde: '#d4a843',
  red: '#a04030',
  auburn: '#703630',
  white: '#e8e8e8',
  gray: '#808080',
  blue: '#4a90d9',
  pink: '#e91e8c',
  purple: '#8e44ad',
};

const initialAvatar: AvatarConfig = {
  bodyType: 'average',
  faceType: 'oval',
  skinTone: 'light',
  hairStyle: 'short',
  hairColor: 'brown',
  topType: 'tshirt',
  topColor: '#3498db',
  bottomType: 'pants',
  bottomColor: '#2c3e50',
  shoeType: 'sneakers',
  shoeColor: '#ecf0f1',
  accessory: 'none',
  name: 'My Avatar',
};

interface AvatarContextType {
  avatar: AvatarConfig;
  setAvatar: React.Dispatch<React.SetStateAction<AvatarConfig>>;
  resetAvatar: () => void;
  getSkinColor: () => string;
  getHairColor: () => string;
}

const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

export function AvatarProvider({ children }: { children: React.ReactNode }) {
  const [avatar, setAvatar] = useState<AvatarConfig>(initialAvatar);

  const resetAvatar = useCallback(() => {
    setAvatar(initialAvatar);
  }, []);

  const getSkinColor = useCallback(() => {
    return skinToneColors[avatar.skinTone];
  }, [avatar.skinTone]);

  const getHairColor = useCallback(() => {
    return hairColorMap[avatar.hairColor];
  }, [avatar.hairColor]);

  return (
    <AvatarContext.Provider value={{ avatar, setAvatar, resetAvatar, getSkinColor, getHairColor }}>
      {children}
    </AvatarContext.Provider>
  );
}

export function useAvatar() {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error('useAvatar must be used within an AvatarProvider');
  }
  return context;
}
