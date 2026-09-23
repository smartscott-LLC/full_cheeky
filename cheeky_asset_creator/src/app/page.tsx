'use client';

import { AvatarProvider } from '@/contexts/AvatarContext';
import dynamic from 'next/dynamic';
import CustomizationPanel from '@/components/ui/CustomizationPanel';
import Image from 'next/image';

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-600">Loading 3D scene...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  return (
    <AvatarProvider>
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <header className="text-center mb-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Cheeky Asset Creator
            </h1>
            <p className="text-gray-400 text-lg">
              Design your perfect Pixar-style avatar
            </p>
          </header>

          {/* Reference Image */}
          <div className="mb-6 flex justify-center">
            <div className="relative w-64 h-80 rounded-xl overflow-hidden shadow-2xl border-2 border-gray-700">
              <Image
                src="/Sasha v2 – Blonde Thai.png"
                alt="Reference Avatar"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-center">
                <p className="text-white text-xs font-medium">Reference Style</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex gap-6 max-w-6xl mx-auto">
            {/* 3D Viewer */}
            <div className="flex-1">
              <div className="bg-gray-900/50 backdrop-blur rounded-2xl shadow-2xl overflow-hidden h-[650px] border border-gray-700">
                <Scene />
              </div>
              
              {/* Quick Actions */}
              <div className="mt-4 flex justify-center gap-3">
                <button className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg font-medium">
                  📸 Save Avatar
                </button>
                <button className="px-5 py-2.5 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-all shadow-lg font-medium">
                  🎲 Randomize
                </button>
                <button className="px-5 py-2.5 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-all shadow-lg font-medium">
                  🔄 Reset
                </button>
              </div>
            </div>

            {/* Customization Panel */}
            <CustomizationPanel />
          </div>

          {/* Footer */}
          <footer className="mt-8 text-center text-gray-500 text-sm">
            <p>Built with Next.js, Three.js & React Three Fiber</p>
            <p className="mt-1">Drag to rotate • Scroll to zoom</p>
          </footer>
        </div>
      </main>
    </AvatarProvider>
  );
}
