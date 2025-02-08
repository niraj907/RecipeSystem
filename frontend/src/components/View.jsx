import React from "react";
import momo from "../assets/momos.jpg";
import { LuPrinterCheck } from "react-icons/lu";
import KitchenGuide from "./recipe/KitchenGuide";
import VideoCategory from "./recipe/VideoCategory";

const View = () => {
  return (
    <div className="w-full py-[3rem] mt-[75px]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 md:px-12">
        <div>
          {/* image */}
          <img
            src={momo}
            alt="Dish presentation"
            className="w-full max-w-[70rem] mx-auto rounded-lg object-cover"
            style={{ height: "auto", maxHeight: "500px" }}
          />

          {/* name */}
          <h1 className="text-3xl sm:text-4xl font-bold text-[#333] py-4">
            Spicy delicious chicken wing
          </h1>
          <p className="text-gray-600 text-sm sm:text-base font-sans">
            Momo is a type of dumpling that originates from Tibet and Nepal, and
            has become popular in various regions of South Asia, including
            India, Bhutan, and even parts of China. These dumplings are
            typically made from a dough filled with a variety of ingredients,
            such as meat (commonly chicken, pork, or buffalo) or vegetables,
            along with spices and seasonings.
          </p>

 {/* Preparation Time */}
 <div className="py-6">
            <h2 className="text-2xl sm:text-3xl font-semibold font-sans">
              Preparation Time
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center  py-6">
              <div className="border-r sm:border-gray-500 pr-4">
                <h2 className="text-lg font-semibold text-gray-500 opacity-80">
                  TOTAL TIME
                </h2>
                <p className="text-base font-medium">60 MIN</p>
              </div>
              <div className="border-r sm:border-gray-500 px-4">
                <h2 className="text-lg font-semibold text-gray-500 opacity-80">
                  PREP TIME
                </h2>
                <p className="text-base font-medium">20 MIN</p>
              </div>
              <div className="border-r sm:border-gray-500 lg:px-4">
                <h2 className="text-lg font-semibold text-gray-500 opacity-80">
                  COOK TIME
                </h2>
                <p className="text-base font-medium">40 MIN</p>
              </div>

              <div className="px-4 text-3xl flex justify-center cursor-pointer">
                <LuPrinterCheck />
              </div>
            </div>

<KitchenGuide/>
<VideoCategory/>

          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
