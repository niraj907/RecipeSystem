import { Routes, Route } from "react-router-dom"; 
import React from "react";
import View from "./components/View";
import Layout from "./Layout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CategoryPage from "./category/CategoryPage";
import SignUpForm from "./components/auth/SignUpForm";
import LoginForm from "./components/auth/LoginForm";

const App = () => {
  return (
    <div className="relative">
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/categories/:category" element={<><Navbar /><CategoryPage /><Footer /></>} />
        <Route path="/view" element={<><Navbar /><View /><Footer /></>} />
        <Route path="/signup" element={<><Navbar /><SignUpForm /><Footer /></>} />
        <Route path="/login" element={<><Navbar /><LoginForm /><Footer /></>} />

      </Routes>
    </div>
  );
};

export default App;
