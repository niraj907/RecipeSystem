import React, { useState } from "react";
import Sidebar from "@/components/admin/Dashboard/Sidebar";
import Header from "@/components/admin/Dashboard/Header";
import RecipeCard from "@/components/admin/Dashboard/RecipeCard";
import Counter from "@/components/admin/Dashboard/Counter";


const AdminDashboard = () => {
  // Control sidebar open state for mobile devices
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar receives open state and toggle function */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content area */}
      <div className="flex-1 min-h-screen transition-all duration-300 ml-0 sm:ml-64">
        <Header setSidebarOpen={setSidebarOpen} />

        {/* Add top padding to avoid header overlap */}
        <div className="pt-20">
          <Counter />
          <RecipeCard />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
