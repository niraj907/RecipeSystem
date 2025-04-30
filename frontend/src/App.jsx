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
import RecipePrinter from "./components/RecipePrinter";
import FavoriteSave from '@/components/admin/Dashboard/FavoriteSave'
import AdminFeedback from "./components/admin/Dashboard/AdminFeedback";
import User from "./components/admin/Dashboard/User";

import MainYoutube from "@/components/admin/Dashboard/MainYoutube"

// admin
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import AdminDashboard from "./components/admin/Dashboard/AdminDashboard";
import Sidebar from "@/components/admin/Dashboard/Sidebar";
import Header from "@/components/admin/Dashboard/Header";
import AddRecipe from "@/components/admin/Dashboard/AddRecipe";
import ViewRecipe from "./components/admin/Dashboard/ViewRecipe";

import Maintain from "./components/admin/Dashboard/Maintain";
import ForgortPasswordAdmin from "./components/admin/Dashboard/ForgortPasswordAdmin";
import ResetPasswordPageAdmin from "./components/admin/Dashboard/ResetPasswordPageAdmin";

// import EditProfile from "./components/EditProfile";
import Favourites from "./components/Favourites";
import ProtectedRoute from "./components/ProtectedRoute";
const App = () => {
  return (
    <div className="relative">
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/categories/:category" element={<><Navbar /><CategoryPage /><Footer /></>} />
        <Route path='/printer/:id' element={<ProtectedRoute> <RecipePrinter />  </ProtectedRoute>} />
        <Route path="/favourites" element={<ProtectedRoute isAdmin={false}><Navbar /><Favourites /><Footer /></ProtectedRoute>} />
        <Route path="/signup" element={<> <SignUpForm /></>} />
        <Route path="/forgot-password" element= {  <ForgotPassword /> } />
        <Route path="/verify-email" element={<> <EmailVerificationPage />  </>} />
        <Route path='/reset-password/:token' element={<> <ResetPasswordPage />  </>} />
        <Route path="/login" element={<><LoginForm /></>} />
 
<Route path="/view/:id" element={<ProtectedRoute isAdmin={false}> <Navbar /><View /><Footer />   </ProtectedRoute>} />


{/* admin panel */}
  
        <Route path="/admin-login" element={<AdminLoginForm />} />
        <Route path="/dashboard" element={  <ProtectedRoute isAdmin={true}> <AdminDashboard />   </ProtectedRoute>  } />
        <Route path="/recipes/add" element={<ProtectedRoute isAdmin={true}><Sidebar/><Header/> <AddRecipe/> </ProtectedRoute> } />
        <Route path="/recipes/view/:id" element={<ProtectedRoute isAdmin={true}><Sidebar/><Header/> <ViewRecipe/> </ProtectedRoute> } />
        <Route path="/dashboard/dishes" element={<ProtectedRoute isAdmin={true}> <Sidebar/><Header/> <Maintain/>  </ProtectedRoute> } />
        <Route path="/dashboard/favorites" element={<ProtectedRoute isAdmin={true}> <Sidebar/><Header/> <FavoriteSave/>  </ProtectedRoute> } />
        <Route path="/dashboard/feedback" element={<ProtectedRoute isAdmin={true}> <Sidebar/><Header/> <AdminFeedback/>  </ProtectedRoute> } />
        <Route path="/dashboard/user" element={<ProtectedRoute isAdmin={true}> <Sidebar/><Header/> <User/>  </ProtectedRoute> } />
        <Route path="/dashboard/youtube" element={<ProtectedRoute isAdmin={true}> <Sidebar/><Header/> <MainYoutube/>  </ProtectedRoute> } />
        <Route path="/forgot-password-admin" element={<><ForgortPasswordAdmin/> </> } />
        <Route path="/reset-password-admin/:token" element={<><ResetPasswordPageAdmin/> </> } />
    
    

          {/* Fallback for any unmatched routes */}
          <Route path="*" element={<ErrorPage />} />

      </Routes>
    </div>
  );
};

export default App;
