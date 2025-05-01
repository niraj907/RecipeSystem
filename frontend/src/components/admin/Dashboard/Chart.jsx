import React from 'react';
import BarGraph from './BarGraph';
import Calendra from './Calendra';

const Chart = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 p-6">
      <div className="w-full ">
        <BarGraph />
      </div>
      <div className="w-full">
        <Calendra />
      </div>
    </div>
  );
};

export default Chart;