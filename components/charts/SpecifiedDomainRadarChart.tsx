'use client';

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { BarChartData } from '../../lib/mockData';

interface SpecifiedDomainRadarChartProps {
  data: BarChartData[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: BarChartData;
    name?: string;
    value?: number;
    color?: string;
  }>;
  label?: string | number;
}

export default function SpecifiedDomainRadarChart({
  data,
}: SpecifiedDomainRadarChartProps) {
  const customTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      const entry = payload[0].payload;

      return (
        <div className='rounded-lg border border-gray-300 bg-white p-4 text-sm shadow-lg'>
          <p className='font-semibold text-gray-800'>{entry.zone}</p>
          <p>Avg. Intensity: {entry.averageIntensity.toFixed(1)}</p>
          <p>Conflicts: {entry.conflicts}</p>
          <p>Casualties: {entry.casualties.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='rounded-lg bg-white p-6 shadow-md'>
      <h3 className='mb-4 text-lg font-semibold text-gray-800'>
        Conflict Intensity by Region
      </h3>
      <div className='h-96'>
        <ResponsiveContainer width='100%' height='100%'>
          <RadarChart outerRadius='80%' data={data}>
            <PolarGrid stroke='#f0f0f0' />
            <PolarAngleAxis dataKey='zone' tick={{ fontSize: 12 }} />
            <PolarRadiusAxis domain={[0, 5]} angle={30} tickCount={6} />
            <Tooltip content={customTooltip} />
            <Radar
              name='Average Intensity'
              dataKey='averageIntensity'
              stroke='#8884d8'
              fill='#8884d8'
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <p className='mt-2 text-sm text-gray-600'>
        Intensity is scored on a scale from 0 (low) to 5 (critical).
      </p>
    </div>
  );
}
