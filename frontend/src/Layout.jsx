import React from "react";
import Hero from "./sections/Hero";
import Category from "./sections/Category";
import Recipe from "./sections/Recipe";
import About from "./sections/About";
import Question from "./sections/Question";
import Testimonial from "./sections/Testimonial";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Layout() {
  return (
    <>
      <Navbar />
        <Hero />
        <Category />
        <Recipe />
        <About />
        <Question />
        <Testimonial />
      <Footer />
    </>
  );
}