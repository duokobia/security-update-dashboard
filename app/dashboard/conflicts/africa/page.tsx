'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic'; // Import dynamic
import { conflictData } from '../../../../lib/mockData';
import Layout from '@/components/layout/Layout';

// 🔧 Dynamically import ConflictMap to disable SSR
const ConflictMap = dynamic(() => import('@/components/map/ConflictMap'), {
  ssr: false,
});

export default function AfricaPage() {
  const [isClient, setIsClient] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);

    const checkAuth = () => {
      try {
        const authStatus = localStorage.getItem('isAuthenticated');
        setIsAuthenticated(!!authStatus);

        if (!authStatus) {
          router.push('/login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  const conflicts = conflictData.filter(data => data.zone === 'Africa');

  if (!isClient || isAuthenticated === null) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-lg'>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
        <div className='px-4 py-6 sm:px-0'>
          <h1 className='mb-8 text-3xl font-bold text-gray-900'>
            Africa Conflicts
          </h1>

          {/* Map Section */}
          <div className='mb-8'>
            <h2 className='mb-4 text-xl font-semibold text-gray-800'>
              Conflict Map
            </h2>

            <ConflictMap conflicts={conflicts} region='Africa' />

            {/* Legend */}
            <div className='mt-4 flex flex-wrap items-center justify-center gap-4'>
              <div className='flex items-center'>
                <div className='mr-2 h-4 w-4 rounded-full bg-red-600'></div>
                <span className='text-sm'>High/Critical Intensity</span>
              </div>
              <div className='flex items-center'>
                <div className='mr-2 h-3 w-3 rounded-full bg-yellow-500'></div>
                <span className='text-sm'>Medium Intensity</span>
              </div>
              <div className='flex items-center'>
                <div className='mr-2 h-2 w-2 rounded-full bg-green-500'></div>
                <span className='text-sm'>Low Intensity</span>
              </div>
            </div>
          </div>

          {/* Conflicts List */}
          <div className='grid grid-cols-1 gap-6'>
            {conflicts.map(conflict => (
              <div
                key={conflict.id}
                className='overflow-hidden rounded-lg bg-white shadow'
              >
                <div className='px-4 py-5 sm:p-6'>
                  <div className='flex items-center justify-between'>
                    <h3 className='text-lg leading-6 font-medium text-gray-900'>
                      {conflict.country}
                    </h3>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium ${
                        conflict.intensity === 'High' ||
                        conflict.intensity === 'Critical'
                          ? 'bg-red-100 text-red-800'
                          : conflict.intensity === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {conflict.intensity} Intensity
                    </span>
                  </div>
                  <div className='mt-4'>
                    <p className='text-sm text-gray-600'>
                      {conflict.description}
                    </p>
                    <div className='mt-4 grid grid-cols-2 gap-4'>
                      <div>
                        <p className='text-sm font-medium text-gray-500'>
                          Type
                        </p>
                        <p className='text-sm text-gray-900'>
                          {conflict.conflictType}
                        </p>
                      </div>
                      <div>
                        <p className='text-sm font-medium text-gray-500'>
                          Start Date
                        </p>
                        <p className='text-sm text-gray-900'>
                          {new Date(conflict.startDate).toLocaleDateString()}
                        </p>
                      </div>
                      {conflict.casualties && (
                        <div>
                          <p className='text-sm font-medium text-gray-500'>
                            Casualties
                          </p>
                          <p className='text-sm text-gray-900'>
                            {conflict.casualties.toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
