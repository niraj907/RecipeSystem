import React from 'react'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import Recipe from './sections/Recipe'
import About from './sections/About'
import Testimonial from './sections/Testimonial'
import Category from './sections/Category'
import Question from './sections/Question'
import Footer from './components/Footer'



const App = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <Category/>
    <Recipe/>
    <About/>
    <Question/>
    <Testimonial/>
    <Footer/>
    </>
  )
}

export default App