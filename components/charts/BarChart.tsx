'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { TooltipContentProps } from 'recharts';

import { BarChartData } from '../lib/mockData';

interface ConflictBarChartProps {
  data: BarChartData[];
}


export default function ConflictBarChart({ data }: ConflictBarChartProps) {
const customTooltip = ({
  active,
  payload,
  label,
}: TooltipContentProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-800 mb-2">
          {typeof label === 'string' || typeof label === 'number' ? label : ''}
        </p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color ?? '#000' }} className="flex items-center">
            <span className="w-3 h-3 bg-current mr-2"></span>
            {entry.name}:{' '}
            <span className="font-semibold ml-1">
              {entry.name === 'casualties'
                ? (entry.value as number).toLocaleString()
                : entry.name === 'averageIntensity'
                ? (entry.value as number).toFixed(1)
                : entry.value}
              {entry.name === 'casualties' ? ' casualties' : ''}
              {entry.name === 'averageIntensity' ? ' intensity' : ''}
            </span>
          </p>
        ))}
      </div>
    );
  }

  return null;
};


  const getColor = (zone: string) => {
    const colors: { [key: string]: string } = {
      'Middle East': '#8884d8',
      'Europe': '#82ca9d',
      'Asia Pacific': '#ffc658',
      'Africa': '#ff7300',
      'Americas': '#8dd1e1',
      'Global': '#d084d0'
    };
    return colors[zone] || '#8884d8';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Conflict Statistics by Region</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="zone" 
              angle={-45}
              textAnchor="end"
              height={60}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              yAxisId="left"
              label={{ 
                value: 'Number of Conflicts', 
                angle: -90, 
                position: 'insideLeft',
                offset: -10,
                style: { textAnchor: 'middle' }
              }}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right"
              label={{ 
                value: 'Casualties (thousands)', 
                angle: -90, 
                position: 'insideRight',
                offset: -10,
                style: { textAnchor: 'middle' }
              }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={customTooltip} />
            <Legend />
            <Bar 
              yAxisId="left"
              dataKey="conflicts" 
              name="Active Conflicts"
              fill="#8884d8"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.zone)} />
              ))}
            </Bar>
            <Bar 
              yAxisId="right"
              dataKey="casualties" 
              name="Total Casualties"
              fill="#82ca9d"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.zone)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-sm text-gray-600 mt-2">
        Comparison of active conflicts and casualties across geopolitical zones
      </p>
    </div>
  );
}