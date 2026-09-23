'use client';

import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-600">Loading 3D scene...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cheeky Asset Creator
          </h1>
          <p className="text-xl text-gray-600">
            Design and manage your 3D assets
          </p>
        </header>
        
        <div className="w-full h-[600px] rounded-xl overflow-hidden shadow-2xl">
          <Scene />
        </div>
        
        <footer className="mt-12 text-center text-gray-500">
          <p>Built with Next.js, Three.js, and React Three Fiber</p>
        </footer>
      </div>
    </main>
  );
}
