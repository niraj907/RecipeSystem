import React, { useState } from "react";
import Sidebar from "@/components/admin/Dashboard/Sidebar";
import Header from "@/components/admin/Dashboard/Header";
import RecipeCard from "@/components/admin/Dashboard/RecipeCard";
import Counter from "@/components/admin/Dashboard/Counter";
import Chart from "./Chart";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar 
        isMobileOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 min-h-screen transition-all duration-300 ml-0 lg:ml-60">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className="pt-20 px-4">
            <Counter/>
              <Chart />
         
            <RecipeCard 
          
          />
          </div>
            
          
        </div>
      </div>
  
  );
};

export default AdminDashboard;
