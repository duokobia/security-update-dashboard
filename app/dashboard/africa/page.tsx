'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../../components/DashboardLayout';
import { conflictData } from '../../../lib/mockData';
import ConflictMap from '@/components/map/ConflictMap';

export default function AfricaPage() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) router.push('/login');
  }, [router]);

  if (!isClient) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const conflicts = conflictData.filter(data => data.zone === 'Africa');

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Africa Conflicts</h1>
           {/* Map Section */}
                    <div className="mb-8">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">Conflict Map</h2>
          
                    
                      <ConflictMap conflicts={conflicts} region="Africa" />
                      
                      {/* Legend */}
                      <div className="flex flex-wrap items-center justify-center mt-4 gap-4">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-red-600 rounded-full mr-2"></div>
                          <span className="text-sm">High/Critical Intensity</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                          <span className="text-sm">Medium Intensity</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-sm">Low Intensity</span>
                        </div>
                      </div>
                    </div>
          <div className="grid grid-cols-1 gap-6">
            {conflicts.map((conflict) => (
              <div key={conflict.id} className="bg-white shadow overflow-hidden rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{conflict.country}</h3>
                    <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${
                      conflict.intensity === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {conflict.intensity} Intensity
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">{conflict.description}</p>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div><p className="text-sm font-medium text-gray-500">Type</p><p className="text-sm text-gray-900">{conflict.conflictType}</p></div>
                      <div><p className="text-sm font-medium text-gray-500">Start Date</p><p className="text-sm text-gray-900">{new Date(conflict.startDate).toLocaleDateString()}</p></div>
                      {conflict.casualties && <div><p className="text-sm font-medium text-gray-500">Casualties</p><p className="text-sm text-gray-900">{conflict.casualties.toLocaleString()}</p></div>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}