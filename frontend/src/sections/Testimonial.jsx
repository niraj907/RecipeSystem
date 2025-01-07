import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';

const Testimonial = () => {
  const testimonials = [
    {
      image: image1,
      title: "Shane Lee",
      subTitle: "Satisfied App User",
      rating: 5,
      description:
        "I found this awesome recipe place, and it’s made cooking so much fun! The recipes are super easy, and I can actually follow them. My kitchen skills have gone from zero to hero!",
    },
    {
      image: image2,
      title: "Alex Morgan",
      subTitle: "Food Enthusiast",
      rating: 4,
      description:
        "The variety of recipes is incredible! It’s perfect for trying out new cuisines and improving my cooking skills.",
    },
    {
      image: image3,
      title: "Chris Parker",
      subTitle: "Home Chef",
      rating: 5,
      description:
        "Amazing platform! The tutorials are easy to follow, and the results are always delicious.",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <section id="testimonial" className="w-full pt-20 pb-96 bg-gray-50">
      <div className="max-w-[1200px]  mx-auto px-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
          Our App User <span className="text-orange-500">Testimonials</span>
        </h2>
        {/* Thumbnail Navigation */}
        <div className="flex justify-center space-x-4 mb-8">
  {testimonials.map((testimonial, index) => (
    <div
      key={index}
      onClick={() => setActiveIndex(index)}
      className={`w-16 h-16 p-1 rounded-full overflow-hidden border-4 cursor-pointer z-20 transition-transform duration-300 ${
        index === activeIndex ? "border-orange-500 scale-110" : "border-gray-300"
      }`}
      style={{
        filter: index !== activeIndex ? "blur(3px)" : "none",
        backdropFilter: index !== activeIndex ? "blur(6px)" : "none",
      }}
    >
      <img
        src={testimonial.image}
        alt={testimonial.title}
        className="w-full h-full object-cover rounded-full"
      />
    </div>
  ))}
</div>

        {/* Main Testimonial with Animation */}
        <div className="relative text-center ">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center"
            >

             <div className='p-14 bg-white mt-[-4rem] '>
              <img
                src={testimonials[activeIndex].image}
                alt={testimonials[activeIndex].title}
                className="w-24 h-24 p-1 object-cover mx-auto rounded-full border-4 border-orange-500 mb-4"
              />
             
              <h3 className="text-lg font-semibold text-gray-900">
                {testimonials[activeIndex].title}
              </h3>
              <p className="text-sm text-gray-500">{testimonials[activeIndex].subTitle}</p>
              <div className="flex justify-center mt-2">
                {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                  <FaStar key={i} className="text-yellow-500" />
                ))}
              </div>
              <p className="text-gray-700 text-center text-sm mt-4 max-w-lg mx-auto">
                {testimonials[activeIndex].description}
              </p>
              </div> 
            </motion.div>
          </AnimatePresence> 
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
