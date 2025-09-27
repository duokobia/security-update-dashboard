'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import DashboardCharts from '../../components/charts/DashboardCharts';
import { conflictData } from '../../lib/mockData';

export default function Dashboard() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);

    // Check authentication
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [router]);

  // Don't render until client-side to avoid hydration issues
  if (!isClient) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-lg'>Loading...</div>
      </div>
    );
  }

  return (
    <Layout>
      <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
        <DashboardCharts />
        <div className='px-4 py-6 sm:px-0'>
          <h1 className='mb-2 text-3xl font-bold text-gray-900'>
            Conflict Updates
          </h1>
          <p className='mb-8 text-gray-600'>
            Global political violence monitoring and analysis
          </p>
          <div className='overflow-hidden bg-white shadow sm:rounded-lg'>
            <div className='px-4 py-5 sm:px-6'>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>
                Recent Conflict Updates
              </h3>
              <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                Latest political violence incidents worldwide
              </p>
            </div>
            <div className='border-t border-gray-200'>
              <ul className='divide-y divide-gray-200'>
                {conflictData.slice(0, 6).map(conflict => (
                  <li
                    key={conflict.id}
                    className='px-4 py-4 transition-colors hover:bg-gray-50 sm:px-6'
                  >
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center'>
                        <div
                          className={`ml-4 h-3 w-3 flex-shrink-0 rounded-full ${
                            conflict.intensity === 'High'
                              ? 'bg-red-500'
                              : conflict.intensity === 'Medium'
                                ? 'bg-yellow-500'
                                : conflict.intensity === 'Low'
                                  ? 'bg-green-500'
                                  : 'bg-purple-500'
                          }`}
                        ></div>
                        <p className='ml-2 truncate text-sm font-medium text-blue-600'>
                          {conflict.country}
                        </p>
                      </div>
                      <div className='ml-2 flex flex-shrink-0'>
                        <span
                          className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${
                            conflict.zone === 'Middle East'
                              ? 'bg-purple-100 text-purple-800'
                              : conflict.zone === 'Europe'
                                ? 'bg-green-100 text-green-800'
                                : conflict.zone === 'Asia Pacific'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : conflict.zone === 'Africa'
                                    ? 'bg-orange-100 text-orange-800'
                                    : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {conflict.zone}
                        </span>
                      </div>
                    </div>
                    <div className='mt-2 sm:flex sm:justify-between'>
                      <div className='sm:flex'>
                        <p className='flex items-center text-sm text-gray-500'>
                          {conflict.conflictType} • {conflict.intensity}{' '}
                          Intensity
                        </p>
                      </div>
                      <div className='mt-2 flex items-center text-sm text-gray-500 sm:mt-0'>
                        <p>
                          Started{' '}
                          {new Date(conflict.startDate).toLocaleDateString()}
                          {conflict.casualties && (
                            <span className='ml-2'>
                              • {conflict.casualties.toLocaleString()}{' '}
                              casualties
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
