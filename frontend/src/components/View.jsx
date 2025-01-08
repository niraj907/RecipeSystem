import React from 'react';
import momo from '../assets/momos.jpg';

const View = () => {
  return (
    <div className="w-full py-[3rem] mt-[75px]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 md:px-12">
        {/* Image Section */}
        <div>
          <img
            src={momo}
            alt="Dish presentation"
            className="w-full max-w-[70rem] mx-auto rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer object-cover"
            style={{ height: 'auto', maxHeight: '500px' }}
          />
        <h1 className="text-4xl font-bold text-[#333] py-4">
              Spicy delicious chicken wing
            </h1>
        </div>
      </div>
    </div>
  );
};

export default View;
