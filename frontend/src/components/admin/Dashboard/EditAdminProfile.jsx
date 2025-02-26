import React, { useState, useEffect, useRef } from 'react';
import useAdminStore from '@/components/admin/adminStore';
import { FaUserPen } from "react-icons/fa6";

import { toast } from "sonner";

const EditAdminProfile = ({ admin, onClose }) => {

  // console.log("admin Edit",admin)
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const { updateAdmin,fetchAdmin } = useAdminStore();

  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    username: '',
  });

  useEffect(() => {
    if (admin) {
      setFormData({
        name: admin.name || '',
        email: admin.email || '',
        password: admin.password || '',
        username: admin.username || '',
      });
    } else {
      // Fetch updated admin details if not available
      fetchAdmin(admin?._id);
    }
  }, [admin, fetchAdmin]);
  

  const handleImageClick = () => {
    inputRef.current.click();
  };

  // Handle input changes
  const handleInputChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file.");
        return;
      }
      setImage(file);
    }
  };

  // Handle profile update
  const handleUpdateProfile = async () => {
    try {
      const updatedAdmin = { ...formData };
      if (image) {
        updatedAdmin.images = [image]; // Send as array under 'images' key
      }
      await updateAdmin(admin._id, updatedAdmin);
      toast.success("Admin updated successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to update admin.");
      console.error(error);
    }
  };



  return (
    <div>
      <div
        id="static-modal"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 "
      >
        <div className="relative p-6 w-full max-w-lg">
          <div className="relative bg-white rounded-lg overflow-y-auto">
            <div className="flex items-center justify-between p-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Update Profile
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 space-y-4">

          
<div className="flex flex-col items-center mt-4">
          <div onClick={handleImageClick} className="cursor-pointer relative">
            {image ? (
              <img src={URL.createObjectURL(image)} className="w-24 h-24 rounded-full object-cover" alt="Preview" />
            ) : admin?.images?.[0]?.url ? (
              <img src={admin.images[0].url} className="w-24 h-24 rounded-full object-cover" alt="Profile" />
            ) : (
              <FaUserPen className="w-24 h-24 text-gray-400 border p-4 rounded-full" />
            )}
            <input type="file" ref={inputRef} accept="image/*" className="hidden" onChange={handleImageChange} />
          </div>
        </div>

          
              <div>
                <label className="block text-gray-700 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded mt-1"
                  value={formData.name}
                  onChange={(e) => handleInputChange(e, "name")}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full p-2 border rounded mt-1 cursor-not-allowed"
                  value={formData.email}
                  disabled 
                  onChange={(e) => handleInputChange(e, "email")}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">
                  Password
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded mt-1"
                  value={formData.password}
                  onChange={(e) => handleInputChange(e, "password")}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded mt-1"
                  value={formData.username}
                  onChange={(e) => handleInputChange(e, "username")}
                />
              </div>
              

            </div>
            <div className="flex items-center p-4">
              <button
                type="button"
                onClick={handleUpdateProfile}
                className="text-white bg-orange-500 hover:bg-orange-300 rounded-lg text-sm px-5 py-2.5"
              >
                Save Changes
              </button>
              <button
                onClick={onClose}
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAdminProfile;