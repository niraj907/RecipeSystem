"use client";

import React from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Define the chart configuration
const chartConfig = {
  rating: {
    label: "Rating",
    color: "#2563eb",
  },
  favourite: {
    label: "Favourite",
    color: "#60a5fa",
  },
};

// Define the chart data
const chartData = [
  { month: "January", rating: 186, favourite: 80 },
  { month: "February", rating: 305, favourite: 200 },
  { month: "March", rating: 237, favourite: 120 },
  { month: "April", rating: 73, favourite: 190 },
  { month: "May", rating: 209, favourite: 130 },
  { month: "June", rating: 214, favourite: 140 },
];

// Custom Tooltip Content Component
const ChartTooltipContent = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow">
        <p className="font-semibold">{label}</p>
        <p className="text-sm">{`Rating: ${payload[0].value}`}</p>
        <p className="text-sm">{`Favourite: ${payload[1].value}`}</p>
      </div>
    );
  }
  return null;
};

// Custom Legend Content Component
const ChartLegendContent = ({ payload }) => {
  return (
    <div className="flex items-center justify-center gap-4">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

// BarGraph Component
const BarGraph = () => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend content={<ChartLegendContent />} />
          <Bar dataKey="rating" fill="#2563eb" radius={4} />
          <Bar dataKey="favourite" fill="#60a5fa" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarGraph;