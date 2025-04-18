import React from 'react';
import BarGraph from './BarGraph';
import PieChart from './PieChart';

const Chart = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 p-6">
      <div className="w-full overflow-x-auto min-w-[300px]">
        <BarGraph />
      </div>
      <div className="w-full overflow-x-auto min-w-[300px]">
        <PieChart />
      </div>
    </div>
  );
};

export default Chart;