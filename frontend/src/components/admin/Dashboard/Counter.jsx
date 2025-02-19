import React, { useEffect } from "react";
import { useCountStore } from "@/components/store/countStore";
import { FaRegUser } from "react-icons/fa";
import { SlUserFemale } from "react-icons/sl";
import { FaUserNinja } from "react-icons/fa";
import { MdOutlineReceiptLong } from "react-icons/md";

const Counter = () => {
  const { totalUsers, maleUsers, femaleUsers, totalRecipes, fetchCounts, loading } = useCountStore();

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {/** Card 1 - Users **/}
      <div className="flex flex-col items-center justify-center bg-blue-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
        <FaRegUser className="text-blue-500 text-5xl" />
        <h1 className="text-lg font-semibold mt-3 text-gray-800">
          Total Users: {loading ? "Loading..." : totalUsers}
        </h1>
      </div>

      {/** Card 2 - Female **/}
      <div className="flex flex-col items-center justify-center bg-pink-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
        <SlUserFemale className="text-pink-500 text-5xl" />
        <h1 className="text-lg font-semibold mt-3 text-gray-800">
          Total Female: {loading ? "Loading..." : femaleUsers}
        </h1>
      </div>

      {/** Card 3 - Male **/}
      <div className="flex flex-col items-center justify-center bg-green-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
        <FaUserNinja className="text-green-500 text-5xl" />
        <h1 className="text-lg font-semibold mt-3 text-gray-800">
          Total Male: {loading ? "Loading..." : maleUsers}
        </h1>
      </div>

      {/** Card 4 - Recipes **/}
      <div className="flex flex-col items-center justify-center bg-yellow-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
        <MdOutlineReceiptLong className="text-yellow-500 text-5xl" />
        <h1 className="text-lg font-semibold mt-3 text-gray-800">
          Total Recipes: {loading ? "Loading..." : totalRecipes}
        </h1>
      </div>
    </div>
  );
};

export default Counter;
