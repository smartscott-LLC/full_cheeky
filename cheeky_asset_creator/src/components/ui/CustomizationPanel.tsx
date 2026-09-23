'use client';

import { useState } from 'react';
import { useAvatar } from '@/contexts/AvatarContext';
import type { 
  BodyType, FaceType, SkinTone, HairStyle, HairColor,
  TopType, BottomType, ShoeType, AccessoryType
} from '@/contexts/AvatarContext';

interface TabProps {
  label: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
}

function Tab({ label, icon, isActive, onClick }: TabProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-all ${
        isActive 
          ? 'bg-primary text-white shadow-md' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      <span className="text-xl mb-1">{icon}</span>
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}

interface OptionButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  color?: string;
}

function OptionButton({ label, isActive, onClick, color }: OptionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
        isActive
          ? 'bg-primary text-white shadow-md'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
      style={color && !isActive ? { backgroundColor: color, color: 'white' } : undefined}
    >
      {label}
    </button>
  );
}

export default function CustomizationPanel() {
  const { avatar, setAvatar } = useAvatar();
  const [activeTab, setActiveTab] = useState<'body' | 'face' | 'hair' | 'clothing' | 'accessories'>('body');

  const skinTones: { value: SkinTone; label: string; color: string }[] = [
    { value: 'fair', label: 'Fair', color: '#FDEBD0' },
    { value: 'light', label: 'Light', color: '#F5CBA7' },
    { value: 'medium', label: 'Medium', color: '#E0AC69' },
    { value: 'olive', label: 'Olive', color: '#C4A882' },
    { value: 'brown', label: 'Brown', color: '#8D5524' },
    { value: 'dark', label: 'Dark', color: '#5D4037' },
  ];

  const bodyTypes: { value: BodyType; label: string }[] = [
    { value: 'slim', label: 'Slim' },
    { value: 'average', label: 'Average' },
    { value: 'muscular', label: 'Muscular' },
    { value: 'heavy', label: 'Heavy' },
  ];

  const faceTypes: { value: FaceType; label: string }[] = [
    { value: 'round', label: 'Round' },
    { value: 'oval', label: 'Oval' },
    { value: 'square', label: 'Square' },
    { value: 'heart', label: 'Heart' },
  ];

  const hairStyles: { value: HairStyle; label: string }[] = [
    { value: 'short', label: 'Short' },
    { value: 'medium', label: 'Medium' },
    { value: 'long', label: 'Long' },
    { value: 'mohawk', label: 'Mohawk' },
    { value: 'buzz', label: 'Buzz' },
    { value: 'curly', label: 'Curly' },
    { value: 'afro', label: 'Afro' },
    { value: 'ponytail', label: 'Ponytail' },
  ];

  const hairColors: { value: HairColor; label: string; color: string }[] = [
    { value: 'black', label: 'Black', color: '#1a1a1a' },
    { value: 'brown', label: 'Brown', color: '#4a3728' },
    { value: 'blonde', label: 'Blonde', color: '#d4a843' },
    { value: 'red', label: 'Red', color: '#a04030' },
    { value: 'auburn', label: 'Auburn', color: '#703630' },
    { value: 'white', label: 'White', color: '#e8e8e8' },
    { value: 'gray', label: 'Gray', color: '#808080' },
    { value: 'blue', label: 'Blue', color: '#4a90d9' },
    { value: 'pink', label: 'Pink', color: '#e91e8c' },
    { value: 'purple', label: 'Purple', color: '#8e44ad' },
  ];

  const topTypes: { value: TopType; label: string }[] = [
    { value: 'tshirt', label: 'T-Shirt' },
    { value: 'hoodie', label: 'Hoodie' },
    { value: 'buttonup', label: 'Button-Up' },
    { value: 'tank', label: 'Tank Top' },
    { value: 'jacket', label: 'Jacket' },
  ];

  const bottomTypes: { value: BottomType; label: string }[] = [
    { value: 'pants', label: 'Pants' },
    { value: 'jeans', label: 'Jeans' },
    { value: 'shorts', label: 'Shorts' },
    { value: 'skirt', label: 'Skirt' },
  ];

  const shoeTypes: { value: ShoeType; label: string }[] = [
    { value: 'sneakers', label: 'Sneakers' },
    { value: 'boots', label: 'Boots' },
    { value: 'sandals', label: 'Sandals' },
    { value: 'formal', label: 'Formal' },
  ];

  const accessoryTypes: { value: AccessoryType; label: string }[] = [
    { value: 'none', label: 'None' },
    { value: 'glasses', label: 'Glasses' },
    { value: 'sunglasses', label: 'Sunglasses' },
    { value: 'hat', label: 'Hat' },
    { value: 'earrings', label: 'Earrings' },
    { value: 'necklace', label: 'Necklace' },
  ];

  const clothingColors = [
    '#3498db', '#e74c3c', '#2ecc71', '#f39c12', 
    '#9b59b6', '#1abc9c', '#34495e', '#e67e22',
    '#16a085', '#27ae60', '#2980b9', '#8e44ad',
    '#c0392b', '#7f8c8d', '#f1c40f', '#ffffff',
    '#000000', '#ff69b4', '#00ced1', '#9370db'
  ];

  const updateAvatar = <K extends keyof typeof avatar>(key: K, value: (typeof avatar)[K]) => {
    setAvatar(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-80 bg-white shadow-xl h-full overflow-y-auto">
      <div className="p-4 border-b bg-gradient-to-r from-primary to-secondary">
        <h2 className="text-lg font-bold text-white">Customize Avatar</h2>
      </div>
      
      <div className="flex border-b">
        <Tab label="Body" icon="👤" isActive={activeTab === 'body'} onClick={() => setActiveTab('body')} />
        <Tab label="Face" icon="😊" isActive={activeTab === 'face'} onClick={() => setActiveTab('face')} />
        <Tab label="Hair" icon="💇" isActive={activeTab === 'hair'} onClick={() => setActiveTab('hair')} />
        <Tab label="Clothes" icon="👕" isActive={activeTab === 'clothing'} onClick={() => setActiveTab('clothing')} />
        <Tab label="Extras" icon="✨" isActive={activeTab === 'accessories'} onClick={() => setActiveTab('accessories')} />
      </div>

      <div className="p-4">
        {activeTab === 'body' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Body Type</label>
              <div className="grid grid-cols-2 gap-2">
                {bodyTypes.map(type => (
                  <OptionButton
                    key={type.value}
                    label={type.label}
                    isActive={avatar.bodyType === type.value}
                    onClick={() => updateAvatar('bodyType', type.value)}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skin Tone</label>
              <div className="grid grid-cols-3 gap-2">
                {skinTones.map(tone => (
                  <button
                    key={tone.value}
                    onClick={() => updateAvatar('skinTone', tone.value)}
                    className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                      avatar.skinTone === tone.value ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <div 
                      className="w-8 h-8 rounded-full mb-1 shadow-inner"
                      style={{ backgroundColor: tone.color }}
                    />
                    <span className="text-xs text-gray-600">{tone.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'face' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Face Shape</label>
              <div className="grid grid-cols-2 gap-2">
                {faceTypes.map(type => (
                  <OptionButton
                    key={type.value}
                    label={type.label}
                    isActive={avatar.faceType === type.value}
                    onClick={() => updateAvatar('faceType', type.value)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'hair' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hair Style</label>
              <div className="grid grid-cols-2 gap-2">
                {hairStyles.map(style => (
                  <OptionButton
                    key={style.value}
                    label={style.label}
                    isActive={avatar.hairStyle === style.value}
                    onClick={() => updateAvatar('hairStyle', style.value)}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hair Color</label>
              <div className="grid grid-cols-5 gap-2">
                {hairColors.map(color => (
                  <button
                    key={color.value}
                    onClick={() => updateAvatar('hairColor', color.value)}
                    className={`w-8 h-8 rounded-full transition-all ${
                      avatar.hairColor === color.value ? 'ring-2 ring-primary scale-110' : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.color }}
                    title={color.label}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'clothing' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Top</label>
              <div className="grid grid-cols-2 gap-2 mb-2">
                {topTypes.map(type => (
                  <OptionButton
                    key={type.value}
                    label={type.label}
                    isActive={avatar.topType === type.value}
                    onClick={() => updateAvatar('topType', type.value)}
                  />
                ))}
              </div>
              <div className="grid grid-cols-5 gap-2">
                {clothingColors.slice(0, 10).map(color => (
                  <button
                    key={color}
                    onClick={() => updateAvatar('topColor', color)}
                    className={`w-8 h-8 rounded-lg transition-all ${
                      avatar.topColor === color ? 'ring-2 ring-primary' : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bottom</label>
              <div className="grid grid-cols-2 gap-2 mb-2">
                {bottomTypes.map(type => (
                  <OptionButton
                    key={type.value}
                    label={type.label}
                    isActive={avatar.bottomType === type.value}
                    onClick={() => updateAvatar('bottomType', type.value)}
                  />
                ))}
              </div>
              <div className="grid grid-cols-5 gap-2">
                {clothingColors.slice(5, 15).map(color => (
                  <button
                    key={color}
                    onClick={() => updateAvatar('bottomColor', color)}
                    className={`w-8 h-8 rounded-lg transition-all ${
                      avatar.bottomColor === color ? 'ring-2 ring-primary' : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Shoes</label>
              <div className="grid grid-cols-2 gap-2 mb-2">
                {shoeTypes.map(type => (
                  <OptionButton
                    key={type.value}
                    label={type.label}
                    isActive={avatar.shoeType === type.value}
                    onClick={() => updateAvatar('shoeType', type.value)}
                  />
                ))}
              </div>
              <div className="grid grid-cols-5 gap-2">
                {clothingColors.slice(0, 5).map(color => (
                  <button
                    key={color}
                    onClick={() => updateAvatar('shoeColor', color)}
                    className={`w-8 h-8 rounded-lg transition-all ${
                      avatar.shoeColor === color ? 'ring-2 ring-primary' : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'accessories' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Accessory</label>
              <div className="grid grid-cols-2 gap-2">
                {accessoryTypes.map(type => (
                  <OptionButton
                    key={type.value}
                    label={type.label}
                    isActive={avatar.accessory === type.value}
                    onClick={() => updateAvatar('accessory', type.value)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
