import React, { useState, useEffect, useRef } from 'react';
import { useAdminStore } from '../adminStore';
import { FaUserPen } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { toast } from "sonner";
import { LuLockKeyhole } from "react-icons/lu";
import AdminChangePassword from './AdminChangePassword';

const EditAdminProfile = ({ admin, onClose }) => {
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const { updateAdmin, fetchAdmin } = useAdminStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    country: '',
    phonenumber: '',
  });

  useEffect(() => {
    if (admin) {
      setFormData({
        name: admin.name || '',
        email: admin.email || '',
        username: admin.username || '',
        country: admin.country || '',
        phonenumber: admin.phonenumber || '',
      });
    } else {
      fetchAdmin(admin?._id);
    }
  }, [admin, fetchAdmin]);

  const handleImageClick = () => inputRef.current.click();

  const handleInputChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
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

  const handleUpdateProfile = async () => {
    try {
      const updatedAdmin = { ...formData };
      if (image) updatedAdmin.images = [image];
      await updateAdmin(admin._id, updatedAdmin);
      toast.success("Admin updated successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to update admin.");
      console.error(error);
    }
  };

  const handleChangePassword = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="fixed inset-0 z-[60] flex justify-center items-start overflow-y-auto bg-black bg-opacity-50">
        <div className="bg-white z-[50] w-full mx-4 my-12 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-6 rounded-lg shadow-lg max-h-fit overflow-y-auto">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">Update Profile</h3>
            <button onClick={onClose} className="text-gray-400 hover:bg-gray-200 p-2 rounded-lg">
              <IoClose className="text-lg" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="mt-4 space-y-4">
            {/* Profile Image */}
            <div className="flex flex-col items-center">
              <div onClick={handleImageClick} className="cursor-pointer relative">
                {image ? (
                  <img src={URL.createObjectURL(image)} className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover" alt="Preview" />
                ) : admin?.images?.[0]?.url ? (
                  <img src={admin.images[0].url} className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover" alt="Profile" />
                ) : (
                  <FaUserPen className="w-20 h-20 sm:w-24 sm:h-24 text-gray-400 border p-4 rounded-full" />
                )}
                <input type="file" ref={inputRef} accept="image/*" className="hidden" onChange={handleImageChange} />
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium">Name</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded mt-1" 
                  value={formData.name} 
                  onChange={(e) => handleInputChange(e, "name")} 
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input 
                  type="email" 
                  className="w-full p-2 border rounded mt-1 cursor-not-allowed" 
                  value={formData.email} 
                  disabled 
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Username</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded mt-1" 
                  value={formData.username} 
                  onChange={(e) => handleInputChange(e, "username")} 
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Country</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded mt-1" 
                  value={formData.country} 
                  onChange={(e) => handleInputChange(e, "country")} 
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Phone Number</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded mt-1" 
                  value={formData.phonenumber} 
                  onChange={(e) => handleInputChange(e, "phonenumber")} 
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="w-full flex flex-col sm:flex-col md:flex-row justify-between items-center gap-4 pt-4">
              <button 
                onClick={handleChangePassword} 
                className="flex items-center w-fit gap-2 px-4 py-2 border rounded-[8px] border-orange-500 bg-orange-100 transition"
              >
                <LuLockKeyhole className="text-lg text-orange-500" />
                <span className="font-medium text-orange-500">Change Password</span>
              </button>

              <div className="flex justify-end gap-3">
                <button 
                  onClick={handleUpdateProfile} 
                  className="text-white bg-orange-500 hover:bg-orange-600 rounded-lg text-sm px-5 py-2.5 transition"
                >
                  Save Changes
                </button>
                <button 
                  onClick={onClose} 
                  className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>

          {/* Password Modal */}
          {isModalOpen && <AdminChangePassword admin={admin} onClose={closeModal} />}
        </div>
      </div>
    </>
  );
};

export default EditAdminProfile;