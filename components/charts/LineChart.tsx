'use client';

import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipContentProps,
} from 'recharts';
import axiosInstance from '@/lib/axios';
import { TimeSeriesData } from '../../lib/mockData';

interface PoliticalViolenceLineChartProps {
  data?: TimeSeriesData[];
}

// Define the API response interface
interface ApiTimeSeriesItem {
  date: string;
  middleEast?: number;
  europe?: number;
  asiaPacific?: number;
  africa?: number;
  americas?: number;
  australia?: number;
  global?: number;
}

export default function PoliticalViolenceLineChart({
  data: propData,
}: PoliticalViolenceLineChartProps) {
  const [data, setData] = useState<TimeSeriesData[]>(propData || []);
  const [loading, setLoading] = useState(!propData); // Only load if no prop data
  const [error, setError] = useState<string | null>(null);

  // Fetch data from API if not provided via props
  useEffect(() => {
    if (propData) {
      setData(propData);
      return; // Use prop data if provided
    }

    const fetchTimeSeriesData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axiosInstance.get<ApiTimeSeriesItem[]>(
          '/conflicts/data/timeseries'
        );

        // Transform the API data to match your TimeSeriesData interface
        const apiData: TimeSeriesData[] = response.data.map(
          (item: ApiTimeSeriesItem) => ({
            date: item.date,
            'Middle East': item.middleEast || 0,
            Europe: item.europe || 0,
            'Asia Pacific': item.asiaPacific || 0,
            Africa: item.africa || 0,
            Americas: item.americas || 0,
            Australia: item.australia || 0,
            Global: item.global || 0,
          })
        );

        setData(apiData);
      } catch (err: unknown) {
        console.error('Error fetching time series data:', err);

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to load data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTimeSeriesData();
  }, [propData]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  const customTooltip = ({
    active,
    payload,
    label,
  }: TooltipContentProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className='rounded-lg border border-gray-300 bg-white p-4 shadow-lg'>
          <p className='font-semibold text-gray-800'>
            {typeof label === 'string' || typeof label === 'number'
              ? formatDate(String(label))
              : ''}
          </p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color ?? '#000' }}>
              {entry.name}:{' '}
              <span className='font-semibold'>{entry.value} incidents</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const zones = [
    'Middle East',
    'Europe',
    'Asia Pacific',
    'Africa',
    'Americas',
    'Australia',
    'Global',
  ];
  const colors = [
    '#8884d8',
    '#82ca9d',
    '#ffc658',
    '#ff7300',
    '#8dd1e1',
    '#82ca9d',
    '#d084d0',
  ];

  // Loading state
  if (loading) {
    return (
      <div className='rounded-lg bg-white p-6 shadow-md'>
        <h3 className='mb-4 text-lg font-semibold text-gray-800'>
          Political Violence Trends
        </h3>
        <div className='flex h-80 items-center justify-center'>
          <div className='text-center'>
            <div className='mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600'></div>
            <p className='mt-2 text-gray-600'>Loading data...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className='rounded-lg bg-white p-6 shadow-md'>
        <h3 className='mb-4 text-lg font-semibold text-gray-800'>
          Political Violence Trends
        </h3>
        <div className='flex h-80 items-center justify-center'>
          <div className='text-center text-red-600'>
            <p className='font-semibold'>Error loading data</p>
            <p className='mt-1 text-sm'>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className='mt-3 rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700'
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty data state
  if (!data || data.length === 0) {
    return (
      <div className='rounded-lg bg-white p-6 shadow-md'>
        <h3 className='mb-4 text-lg font-semibold text-gray-800'>
          Political Violence Trends
        </h3>
        <div className='flex h-80 items-center justify-center'>
          <p className='text-gray-600'>No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className='rounded-lg bg-white p-6 shadow-md'>
      <h3 className='mb-4 text-lg font-semibold text-gray-800'>
        Political Violence Trends (2023)
      </h3>
      <div className='h-80'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
            <XAxis
              dataKey='date'
              tickFormatter={formatDate}
              angle={-45}
              textAnchor='end'
              height={60}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              label={{
                value: 'Incidents',
                angle: -90,
                position: 'insideLeft',
                offset: -10,
                style: { textAnchor: 'middle' },
              }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={customTooltip} />
            <Legend />
            {zones.map((zone, index) => (
              <Line
                key={zone}
                type='monotone'
                dataKey={zone}
                stroke={colors[index]}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className='mt-2 text-sm text-gray-600'>
        Monthly political violence incidents by geopolitical zone
      </p>
    </div>
  );
}
