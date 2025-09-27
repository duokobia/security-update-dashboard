'use client';

import PoliticalViolenceLineChart from './LineChart';
import ConflictBarChart from './BarChart';
import { timeSeriesData, barChartData } from '../../lib/mockData';
import ScatterChartWithCells from './ScatterChartWithCells';
import SpecifiedDomainRadarChart from './SpecifiedDomainRadarChart';

export default function AnalyticsCharts() {
  return (
    <div className='mt-8'>
      <h2 className='mb-6 text-2xl font-bold text-gray-900'>
        Conflict Analytics
      </h2>

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
              {timeSeriesData[timeSeriesData.length - 1]['Global']}
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

      <div className='mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <SpecifiedDomainRadarChart data={barChartData} />
        <ScatterChartWithCells />
      </div>
    </div>
  );
}
