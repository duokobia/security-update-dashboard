'use client';

import PoliticalViolenceLineChart from './LineChart';
import ConflictBarChart from './BarChart';
import { timeSeriesData, barChartData } from '../lib/mockData';

export default function DashboardCharts() {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Conflict Analytics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Line Chart */}
        <PoliticalViolenceLineChart data={timeSeriesData} />
        
        {/* Bar Chart */}
        <ConflictBarChart data={barChartData} />
      </div>

      {/* Key Metrics Summary */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {barChartData.find(d => d.zone === 'Global')?.conflicts}
            </div>
            <div className="text-sm text-gray-600">Total Active Conflicts</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {((barChartData.find(d => d.zone === 'Global')?.casualties || 0) / 1000).toFixed(0)}k
            </div>
            <div className="text-sm text-gray-600">Estimated Casualties</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {timeSeriesData[timeSeriesData.length - 1]['Global']}
            </div>
            <div className="text-sm text-gray-600">Recent Monthly Incidents</div>
          </div>
        </div>
      </div>
    </div>
  );
}