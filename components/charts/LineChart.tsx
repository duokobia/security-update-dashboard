"use client";

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
} from "recharts";
import { TimeSeriesData } from "../../lib/mockData";

interface PoliticalViolenceLineChartProps {
  data: TimeSeriesData[];
}

export default function PoliticalViolenceLineChart({
  data,
}: PoliticalViolenceLineChartProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "-01");
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const customTooltip = ({
    active,
    payload,
    label,
  }: TooltipContentProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-gray-300 bg-white p-4 shadow-lg">
          <p className="font-semibold text-gray-800">
            {typeof label === "string" || typeof label === "number"
              ? formatDate(String(label))
              : ""}
          </p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color ?? "#000" }}>
              {entry.name}:{" "}
              <span className="font-semibold">{entry.value} incidents</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const zones = ['Middle East', 'Europe', 'Asia Pacific', 'Africa', 'Americas', 'Australia','Global'];
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1','#82ca9d', '#d084d0'];

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        Political Violence Trends (2023)
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              angle={-45}
              textAnchor="end"
              height={60}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              label={{
                value: "Incidents",
                angle: -90,
                position: "insideLeft",
                offset: -10,
                style: { textAnchor: "middle" },
              }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={customTooltip} />
            <Legend />
            {zones.map((zone, index) => (
              <Line
                key={zone}
                type="monotone"
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
      <p className="mt-2 text-sm text-gray-600">
        Monthly political violence incidents by geopolitical zone
      </p>
    </div>
  );
}
