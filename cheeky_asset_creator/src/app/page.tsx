'use client';

import { AvatarProvider } from '@/contexts/AvatarContext';
import dynamic from 'next/dynamic';
import CustomizationPanel from '@/components/ui/CustomizationPanel';

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
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              Cheeky Asset Creator
            </h1>
            <p className="text-gray-600 text-lg">
              Design your perfect Pixar-style avatar
            </p>
          </header>

          {/* Main Content */}
          <div className="flex gap-6 max-w-6xl mx-auto">
            {/* 3D Viewer */}
            <div className="flex-1">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-[600px]">
                <Scene />
              </div>
              
              {/* Quick Actions */}
              <div className="mt-4 flex justify-center gap-3">
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-md">
                  📸 Save Avatar
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors shadow-md">
                  🎲 Randomize
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors shadow-md">
                  🔄 Reset
                </button>
              </div>
            </div>

            {/* Customization Panel */}
            <CustomizationPanel />
          </div>

          {/* Footer */}
          <footer className="mt-12 text-center text-gray-500 text-sm">
            <p>Built with Next.js, Three.js & React Three Fiber</p>
            <p className="mt-1">Drag to rotate • Scroll to zoom</p>
          </footer>
        </div>
      </main>
    </AvatarProvider>
  );
}
