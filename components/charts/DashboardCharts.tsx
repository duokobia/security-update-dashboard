'use client';

import { useEffect, useState } from 'react';
import PoliticalViolenceLineChart from './LineChart';
import ConflictBarChart from './BarChart';
import { barChartData } from '../../lib/mockData';
import axiosInstance from '../../lib/axios';

export default function DashboardCharts() {
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimeSeriesData = async () => {
      try {
        const response = await axiosInstance.get('/conflicts/data/timeseries');
        setTimeSeriesData(response.data);
      } catch (error) {
        console.error('Error fetching time series data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeSeriesData();
  }, []);

  const latestIncidentCount = timeSeriesData.length
    ? timeSeriesData[timeSeriesData.length - 1]?.['Global']
    : '-';

  return (
    <div className='mt-8'>
      {/* Key Metrics Summary */}
      <div className='mb-8 rounded-lg bg-white p-6 shadow-md'>
        <h3 className='mb-4 text-lg font-semibold text-gray-800'>
          Key Insights
        </h3>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          <div className='rounded-lg bg-blue-50 p-4'>
            <div className='text-2xl font-bold text-blue-600'>
              {barChartData.find(d => d.zone === 'Global')?.conflicts}
            </div>
            <div className='text-sm text-gray-600'>Total Active Conflicts</div>
          </div>
          <div className='rounded-lg bg-red-50 p-4'>
            <div className='text-2xl font-bold text-red-600'>
              {(
                (barChartData.find(d => d.zone === 'Global')?.casualties || 0) /
                1000
              ).toFixed(0)}
              k
            </div>
            <div className='text-sm text-gray-600'>Estimated Casualties</div>
          </div>
          <div className='rounded-lg bg-green-50 p-4'>
            <div className='text-2xl font-bold text-green-600'>
              {loading ? 'Loading...' : latestIncidentCount}
            </div>
            <div className='text-sm text-gray-600'>
              Recent Monthly Incidents
            </div>
          </div>
        </div>
      </div>

      <div className='mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2'>
        {/* Line Chart */}
        <PoliticalViolenceLineChart data={timeSeriesData} />

        {/* Bar Chart */}
        <ConflictBarChart data={barChartData} />
      </div>
    </div>
  );
}
