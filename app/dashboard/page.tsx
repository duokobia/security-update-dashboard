'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../components/DashboardLayout';
import DashboardCharts from '../../components/DashboardCharts';
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const zones = ['Middle East', 'Europe', 'Asia Pacific', 'Africa', 'Americas'];
  
  const zoneStats = zones.map(zone => ({
    name: zone,
    count: conflictData.filter(data => data.zone === zone).length,
    highIntensity: conflictData.filter(data => data.zone === zone && data.intensity === 'High').length,
    casualties: conflictData
      .filter(data => data.zone === zone)
      .reduce((sum, conflict) => sum + (conflict.casualties || 0), 0),
  }));

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Charts Section */}
          <DashboardCharts />

        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Conflict Dashboard</h1>
          <p className="text-gray-600 mb-8">Global political violence monitoring and analysis</p>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            {zoneStats.map((zone) => (
              <div key={zone.name} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                      <span className="text-white text-lg font-bold">{zone.count}</span>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {zone.name}
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {zone.highIntensity} high intensity
                        </dd>
                        <dd className="text-sm text-gray-500">
                          {zone.casualties.toLocaleString()} casualties
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <a 
                      href={`/dashboard/${zone.name.toLowerCase().replace(' ', '-')}`}
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      View regional details →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

         

          {/* Recent Conflicts */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Conflict Updates</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Latest political violence incidents worldwide</p>
            </div>
            <div className="border-t border-gray-200">
              <ul className="divide-y divide-gray-200">
                {conflictData.slice(0, 6).map((conflict) => (
                  <li key={conflict.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`ml-4 flex-shrink-0 w-3 h-3 rounded-full ${
                          conflict.intensity === 'High' ? 'bg-red-500' :
                          conflict.intensity === 'Medium' ? 'bg-yellow-500' :
                          conflict.intensity === 'Low' ? 'bg-green-500' : 'bg-purple-500'
                        }`}></div>
                        <p className="text-sm font-medium text-blue-600 truncate ml-2">
                          {conflict.country}
                        </p>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          conflict.zone === 'Middle East' ? 'bg-purple-100 text-purple-800' :
                          conflict.zone === 'Europe' ? 'bg-green-100 text-green-800' :
                          conflict.zone === 'Asia Pacific' ? 'bg-yellow-100 text-yellow-800' :
                          conflict.zone === 'Africa' ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {conflict.zone}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          {conflict.conflictType} • {conflict.intensity} Intensity
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>
                          Started {new Date(conflict.startDate).toLocaleDateString()}
                          {conflict.casualties && (
                            <span className="ml-2">• {conflict.casualties.toLocaleString()} casualties</span>
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
    </DashboardLayout>
  );
}