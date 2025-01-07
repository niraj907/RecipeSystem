import { Routes, Route, useLocation } from "react-router-dom";
import React from "react";
import View from "./components/View";
import Layout from "./Layout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  const location = useLocation(); // Get the current route

  const isViewPage = location.pathname === "/view"; // Check if the route is "/View"

  return (
    <div className="relative">
      <Routes>
        <Route
          path="/"
          element={
           <Layout/>
          }
        />
        <Route path="/view" element={<> <Navbar /><View /><Footer/></>} />
      </Routes>
      
    </div>
  );
};

export default App;
