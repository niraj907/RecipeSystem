import { Routes, Route } from "react-router-dom"; 
import React, { useEffect } from "react";
import View from "./components/View";
import Layout from "./Layout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CategoryPage from "./category/CategoryPage";
import SignUpForm from "./components/auth/SignUpForm";
import LoginForm from "./components/auth/LoginForm";
import ForgotPassword from "./components/auth/ForgotPassword";
import EmailVerificationPage from "./components/auth/EmailVerificationPage";
import ErrorPage from "./components/ErrorPage";
import ProtectedRoute from "./ProtectedRoute";
import ResetPasswordPage from "./components/auth/ResetPasswordPage";

// admin
import SignupForm from "@/components/admin/auth/SignupForm.jsx";
import EditProfile from "./components/EditProfile";
const App = () => {
  return (
    <div className="relative">
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/categories/:category" element={<><Navbar /><CategoryPage /><Footer /></>} />
        <Route path="/view/:id" element={<><Navbar /><View /><Footer /></>}
        
        />
        <Route path="/signup" element={<><SignUpForm /></>} />
        <Route path="/login" element={<><LoginForm /></>} />
        <Route path="/forgot-password" element={<><ForgotPassword /></>} />
        <Route path="/verify-email" element={<><EmailVerificationPage /></>} />
        <Route path='/reset-password/:token' element={<><ResetPasswordPage /></>} />
 

        <Route
          path="/"
          element={ 
          <ProtectedRoute>
             <Layout />
            </ProtectedRoute>
          }
        />

<Route
  path="/edit-profile"
  element={
    <ProtectedRoute>
   <Navbar  />   <EditProfile />
    </ProtectedRoute>
  }
/>






{/* admin panel */}
        <Route path="/admin-signup" element={<SignupForm />} />


          {/* Fallback for any unmatched routes */}
          <Route path="*" element={<ErrorPage />} />


      </Routes>
    </div>
  );
};

export default App;
