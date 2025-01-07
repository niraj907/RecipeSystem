import React, { useState } from "react";
import { faqData } from "./data.js";

const Question = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full py-10 md:py-16 bg-[#FEF5EC]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 md:px-12">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold">
            <span className="text-[#F67A24]">Questions?</span> Look here.
          </h1>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg shadow-md transition-all duration-300"
            >
              {/* Question Header */}
              <div
                onClick={() => toggleFaq(index)}
                className="flex justify-between items-center cursor-pointer p-5 sm:p-6 rounded-t-lg bg-gray-100 hover:bg-gray-200"
              >
                <h1 className="text-base sm:text-lg md:text-xl font-medium">
                  {item.question}
                </h1>
                <span
                  className={`transform transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </div>

              {/* Answer Section */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out bg-[#F67A24] text-white rounded-b-lg px-4 sm:px-6 ${
                  activeIndex === index
                    ? "max-h-[300px] py-4 opacity-100"
                    : "max-h-0 py-0 opacity-0"
                }`}
              >
                <p className="text-sm sm:text-base md:text-lg transition-opacity duration-500">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Question;
