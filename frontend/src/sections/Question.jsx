import React, { useState } from 'react';
import { faqData } from './data.js';

const Question = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full py-[60px] md:py-[90px] bg-[#FEF5EC]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-12">
        <div>
          <h1 className="text-3xl md:text-4xl text-center">
            <span className="text-[#F67A24]">Questions?</span> Look here.
          </h1>
        </div>

        <div>
          {faqData.map((item, index) => (
            <div className="my-5" key={index}>
              <div
                onClick={() => toggleFaq(index)}
                className={`bg-[#F6F6F6] py-4 px-6 flex justify-between items-center cursor-pointer 
                rounded-tl-[8px] rounded-tr-[8px] transition-all duration-300 shadow-md`}
              >
                <h1 className="text-[25px] font-medium">{item.question}</h1>
                <span
                  className={`transform transition-transform duration-300 ${
                    activeIndex === index ? 'rotate-180' : ''
                  }`}
                >
                  ▼ 
                </span>
              </div>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out bg-[#F67A24] text-white 
                rounded-br-[8px] rounded-bl-[8px] px-6 ${
                  activeIndex === index ? 'max-h-[500px] py-4 opacity-100' : 'max-h-0 py-0 opacity-0'
                }`}
              >
                <p className="transition-opacity duration-500 ease-in-out">
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
