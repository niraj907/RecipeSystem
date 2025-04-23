import React, { useEffect, useRef, useState } from "react";
import { useAuthStore } from "./store/authStore";
import { toast } from "sonner";
import { FaUserPen } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { LuLockKeyhole } from "react-icons/lu";
import ChangePassword from "./ChangePassword";

const EditProfile = ({ user, onClose }) => {
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const { updateProfile } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    images: "",
    country: "",
    gender: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        username: user.username || "",
        images: user.images || "",
        country: user.country || "",
        gender: user.gender || "",
      });
    }
  }, [user]);

  const handleImageClick = () => {
    inputRef.current.click();
  };

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

  const handleUpdateProfile = async () => {
    try {
      const updatedProfile = new FormData();
      updatedProfile.append("name", formData.name);
      updatedProfile.append("email", formData.email);
      updatedProfile.append("username", formData.username);
      updatedProfile.append("country", formData.country);
      updatedProfile.append("gender", formData.gender);
      
      if (image) {
        updatedProfile.append("images", image);
      }

      await updateProfile(user._id, updatedProfile);
      toast.success("Profile updated successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error(error);
    }
  };

  const handleChangePassword = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4 sm:px-0">
      <div className="bg-white w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-6 overflow-y-auto rounded-lg shadow-lg" style={{ maxHeight: "90vh" }}>
      
        <div className="flex justify-between items-center">
          <h3 className="text-lg sm:text-xl font-semibold">Update Profile</h3>
          <button onClick={onClose} className="text-gray-400 hover:bg-gray-200 p-2 rounded-lg">
            <IoClose className="text-lg" />
          </button>
        </div>

        <div className="space-y-4 py-4">
          <div className="flex flex-col items-center mt-4">
            <div onClick={handleImageClick} className="cursor-pointer relative">
              {image ? (
                <img src={URL.createObjectURL(image)} className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover" alt="Preview" />
              ) : user?.images?.[0]?.url ? (
                <img src={user.images[0].url} className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover" alt="Profile" />
              ) : (
                <FaUserPen className="w-20 h-20 sm:w-24 sm:h-24 text-gray-400 border p-4 rounded-full" />
              )}
              <input type="file" ref={inputRef} accept="image/*" className="hidden" onChange={handleImageChange} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <input type="text" className="w-full p-2 border rounded mt-1" value={formData.name} onChange={(e) => handleInputChange(e, "name")} />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input type="email" className="w-full p-2 border rounded mt-1 bg-gray-100 cursor-not-allowed" value={formData.email} disabled />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Country</label>
              <input type="text" className="w-full p-2 border rounded mt-1" value={formData.country} onChange={(e) => handleInputChange(e, "country")} />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Username</label>
              <input type="text" className="w-full p-2 border rounded mt-1" value={formData.username} onChange={(e) => handleInputChange(e, "username")} />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Gender</label>
              <select 
                name="gender" 
                id="gender" 
                value={formData.gender} 
                onChange={(e) => handleInputChange(e, "gender")} 
                className="w-full p-2 border rounded mt-1"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Password</label>
              <button 
                onClick={handleChangePassword} 
                className="flex items-center gap-2 px-4 py-2 border border-green-300 rounded-md hover:bg-green-100 transition w-full"
              >
                <LuLockKeyhole className="text-lg" />
                <span className="font-medium">Change Password</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={handleUpdateProfile} className="text-white bg-orange-500 hover:bg-orange-600 rounded-lg text-sm px-5 py-2.5 transition">
            Save Changes
          </button>
          <button onClick={onClose} className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 transition">
            Cancel
          </button>
        </div>
      </div>

      {isModalOpen && (
        <ChangePassword user={user} onClose={closeModal} />
      )}
    </div>
  );
};

export default EditProfile;