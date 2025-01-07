import React from 'react';
import { Button } from '@/components/ui/button';
import { LuAlarmClockCheck } from 'react-icons/lu';
import { FaRegPlayCircle } from 'react-icons/fa';
import momo from '../assets/momos.jpg';
import { Link } from "react-router";

const Hero = () => {
  return (
    <section id='home' className="w-full py-[2.7rem] md:py-[5.4rem]  bg-[#FEF5EC]">
      <div className="max-w-[1200px] mx-auto px-8 md:px-12 py-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Section */}
          <div>
            <h2 className="text-4xl font-bold text-[#333] mb-4">
              Spicy delicious chicken wing
            </h2>
            <p className="text-[#666666] mb-6 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.
            </p>
            <div className="flex items-center gap-4">
              <Button className="flex items-center gap-2 bg-[#F67A24] hover:bg-[#f67b24e8] text-white px-6 py-2 rounded-md transition duration-300 ease-in-out">
                <LuAlarmClockCheck />
                <span className='md:text-[16px]'>32 Minutes</span>
              </Button>


<Link to="/view"
  className="flex items-center gap-2 bg-white text-[#666666] 
  hover:bg-[#FEF5EC] hover:text-[#F67A24] 
  hover:ring-[#F67A24] hover:ring-4 
  px-6 py-2 rounded-md 
 transition-all ease-in-out duration-300"
>
  <FaRegPlayCircle />
  <span className='md:text-[16px]'>View Recipes</span>
</Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative">
            <img
              src={momo}
              alt="Dish presentation"
              className="w-full rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;