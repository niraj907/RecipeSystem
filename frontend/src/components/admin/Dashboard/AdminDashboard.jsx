import React from "react";
import Sidebar from "@/components/admin/Dashboard/Sidebar"; // ✅ Correct import
import Header from "@/components/admin/Dashboard/Header";
import RecipeCard from "@/components/admin/Dashboard/RecipeCard";
import Counter from "@/components/admin/Dashboard/Counter";
const AdminDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <Counter/>
        <RecipeCard/>
      </div>
    </div>
  );
};

export default AdminDashboard;
