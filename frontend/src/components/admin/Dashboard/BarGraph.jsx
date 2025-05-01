"use client";

import React, { useEffect } from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useCountStore } from "@/components/store/countStore";

const ChartTooltipContent = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow">
        <p className="font-semibold">{label}</p>
        <p className="text-sm" style={{ color: '#FFA52C' }}>{`Male: ${payload[0].value}`}</p>
        <p className="text-sm" style={{ color: '#FBBC05' }}>{`Female: ${payload[1].value}`}</p>
      </div>
    );
  }
  return null;
};

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

const BarGraph = () => {
  const { monthlyGenderData, fetchMonthlyGenderStats, loading } = useCountStore();

  useEffect(() => {
    fetchMonthlyGenderStats();
  }, [fetchMonthlyGenderStats]);

  // Transform data to match Recharts format
  const transformedData = monthlyGenderData.map(item => ({
    month: item.month,
    male: item.males,
    female: item.females
  }));

  if (loading) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center">
        <p>Loading gender distribution data...</p>
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full pb-10">
      <h2 className="text-xl font-semibold mb-4">Monthly User Gender Distribution</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={transformedData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value}
          />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend content={<ChartLegendContent />} />
          <Bar 
            dataKey="male" 
            name="Male Users"
            fill="#FFA52C" 
            radius={[4, 4, 0, 0]} 
          />
          <Bar 
            dataKey="female" 
            name="Female Users"
            fill="#FBBC05" 
            radius={[4, 4, 0, 0]} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarGraph;