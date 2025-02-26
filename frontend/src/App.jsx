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
import ResetPasswordPage from "./components/auth/ResetPasswordPage";

// admin
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import AdminDashboard from "./components/admin/Dashboard/AdminDashboard";
import Sidebar from "@/components/admin/Dashboard/Sidebar";
import Header from "@/components/admin/Dashboard/Header";
import AddRecipe from "@/components/admin/Dashboard/AddRecipe";
import ViewRecipe from "./components/admin/Dashboard/ViewRecipe";
// import UpdateRecipe from "./components/admin/Dashboard/UpdateRecipe";
import Maintain from "./components/admin/Dashboard/Maintain";
import ForgortPasswordAdmin from "./components/admin/Dashboard/ForgortPasswordAdmin";


// import EditProfile from "./components/EditProfile";
import Favourites from "./components/Favourites";
const App = () => {
  return (
    <div className="relative">
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/categories/:category" element={<><Navbar /><CategoryPage /><Footer /></>} />
        <Route path="/view/:id" element={<><Navbar /><View /><Footer /></>}
        
        />
        <Route path="/favourites" element={<><Navbar /><Favourites /><Footer /></>} />
        <Route path="/signup" element={<> <SignUpForm /></>} />
        <Route path="/login" element={<><LoginForm /></>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<><EmailVerificationPage /></>} />
        <Route path='/reset-password/:token' element={<><ResetPasswordPage /></>} />
 
        {/* <Route path="/edit-profile" element={ <><Navbar /><EditProfile /></>} /> */}

{/* admin panel */}
        <Route path="/admin-login" element={<AdminLoginForm />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/recipes/add" element={<><Sidebar/><Header/> <AddRecipe/> </> } />
        {/* <Route path="/recipes/update" element={<><Sidebar/><Header/> <UpdateRecipe/> </> } /> */}
        <Route path="/recipes/view/:id" element={<><Sidebar/><Header/> <ViewRecipe/> </> } />
        <Route path="/dashboard/maintenance" element={<><Sidebar/><Header/> <Maintain/> </> } />
        <Route path="/forgot-password-admin" element={<><ForgortPasswordAdmin/> </> } />


          {/* Fallback for any unmatched routes */}
          <Route path="*" element={<ErrorPage />} />

      </Routes>
    </div>
  );
};

export default App;
