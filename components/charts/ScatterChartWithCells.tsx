"use client";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  TooltipContentProps,
} from "recharts";
import { conflictData } from "../../lib/mockData";

const zoneColors: Record<string, string> = {
  "Middle East": "#8884d8",
  Europe: "#82ca9d",
  "Asia Pacific": "#ffc658",
  Africa: "#ff7300",
  Americas: "#8dd1e1",
  Global: "#d084d0",
};

interface ChartPoint {
  x: number; // timestamp
  y: number; // casualties
  zone: string;
  country: string;
  intensity: string;
}

const chartData: ChartPoint[] = conflictData.map((conflict) => ({
  x: new Date(conflict.startDate).getTime(),
  y: conflict.casualties ?? 0,
  zone: conflict.zone,
  country: conflict.country,
  intensity: conflict.intensity,
}));

const CustomTooltip = ({
  active,
  payload,
}: TooltipContentProps<number, string>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as ChartPoint;

    return (
      <div className="rounded border border-gray-300 bg-white p-3 text-sm shadow">
        <p className="font-semibold">
          {data.country} ({data.zone})
        </p>
        <p>Start Date: {new Date(data.x).toLocaleDateString()}</p>
        <p>Casualties: {data.y.toLocaleString()}</p>
        <p>Intensity: {data.intensity}</p>
      </div>
    );
  }
  return null;
};

export default function ScatterChartWithCells() {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        Conflicts by Start Date and Casualties
      </h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
            <CartesianGrid />
            <XAxis
              type="number"
              dataKey="x"
              name="Start Date"
              tickFormatter={(value) =>
                new Date(value).getFullYear().toString()
              }
              domain={["auto", "auto"]}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="Casualties"
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={CustomTooltip} />
            <Scatter data={chartData} fill="#8884d8">
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={zoneColors[entry.zone] || "#8884d8"}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
