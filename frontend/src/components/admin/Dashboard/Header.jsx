import React, { useState, useEffect } from "react";
import { Bell, Menu } from "lucide-react";
import EditAdminProfile from "@/components/admin/Dashboard/EditAdminProfile";
import useAdminStore from '@/components/admin/adminStore';

const Header = ({ setSidebarOpen }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedAdmin, setSelectedAdmin] = useState(null);
  const { admin, fetchAdmin } = useAdminStore();

  // useEffect(() => {
  //   fetchAdmin(); // Fetch admin data when the component mounts
  // }, []);

  useEffect(() => {
    fetchAdmin();
  }, []);
  
  useEffect(() => {
    console.log("Admin updated in state:", admin);
  }, [admin]);  // Log admin when it updates
  
 
  console.log("Adminsss: ", admin);


  const handleEdit = () => {
    setSelectedAdmin(admin);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAdmin(null);
  };

  return (
    <div className="bg-white shadow py-4 px-4 flex items-center justify-between fixed top-0 left-0 right-0 z-10">
      <div className="flex items-center">
        <div className="md:hidden mr-4">
          <Menu onClick={() => setSidebarOpen(prev => !prev)} className="cursor-pointer" />
        </div>
        <h1 className="lg:ml-[18rem] text-lg font-bold">Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4 ml-auto">
        <Bell size={26} className="cursor-pointer" />
        <div onClick={handleEdit} className="cursor-pointer">
        <img
  className="w-8 h-8 rounded-full object-cover"
  src={admin?.images?.[0]?.url || "https://github.com/shadcn.png"}
  alt="User  Profile"
/>
        </div>
      </div>

      {isModalOpen && <EditAdminProfile admin={selectedAdmin} onClose={closeModal} />}
    </div>
  );
};

export default Header;
