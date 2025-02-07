import React from "react";
import momo from "../assets/momos.jpg";
import { LuPrinterCheck } from "react-icons/lu";

const View = () => {
  return (
    <div className="w-full py-[3rem] mt-[75px]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 md:px-12">
        <div>
          {/* image */}
          <img
            src={momo}
            alt="Dish presentation"
            className="w-full max-w-[70rem] mx-auto rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer object-cover"
            style={{ height: "auto", maxHeight: "500px" }}
          />

          {/* name */}
          <h1 className="text-4xl font-bold text-[#333] py-4">
            Spicy delicious chicken wing
          </h1>
          <p className="text-[#666666] font-sans">
            Momo is a type of dumpling that originates from Tibet and Nepal, and
            has become popular in various regions of South Asia, including
            India, Bhutan, and even parts of China. These dumplings are
            typically made from a dough filled with a variety of ingredients,
            such as meat (commonly chicken, pork, or buffalo) or vegetables,
            along with spices and seasonings.
          </p>

          <div className="py-6">
            <h2 className="text-3xl font-semibold font-sans">Preparation time</h2>
            <div className="flex  items-center py-4">
              <div className="border-r-2 border-gray-500 pr-4">
                <h2 className="text-2xl font-semibold text-[#666666]">TOTAL TIME</h2>
                <p>60 MIN</p>
              </div>
              <div className="border-r-2 border-gray-500 px-4">
              <h2 className="text-2xl font-semibold text-[#666666]">PREPARATION TIME</h2>
                <p>60 MIN</p>
              </div>
              <div className="border-r-2 border-gray-500 px-4">
              <h2 className="text-2xl font-semibold text-[#666666]">COOKING TIME</h2>
                <p>60 MIN</p>
              </div>
              <div className="px-4 text-3xl">
              <LuPrinterCheck />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
