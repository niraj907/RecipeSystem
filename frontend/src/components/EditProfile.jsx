import React, { useEffect, useRef, useState } from "react";
import { useAuthStore } from "./store/authStore";
import { toast } from "sonner";
import { FaUserPen } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const EditProfile = ({ user, onClose }) => {
    const inputRef = useRef(null);
    const [image, setImage] = useState(null);

  const { updateProfile } = useAuthStore();
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
        name: user.name || '',
        email: user.email || '',
        username: user.username || '',
        images: user.images || '',
        country: user.country || '',
        gender: user.gender || '',
      });
    } 
  }, [user]);
  

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
      const updatedProfile = new FormData(); // Create a new FormData object
      updatedProfile.append("name", formData.name);
      updatedProfile.append("email", formData.email);
      updatedProfile.append("username", formData.username);
      updatedProfile.append("country", formData.country);
      updatedProfile.append("gender", formData.gender);
      
      // If there's a new image, append it as well
      if (image) {
        updatedProfile.append("images", image); // Append the image file
      }

      await updateProfile(user._id, updatedProfile);
      toast.success("Profile updated successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <div className="flex justify-between items-center pb-4">
          <h3 className="text-xl font-semibold">Update Profile</h3>
          <button onClick={onClose} className="text-gray-400 hover:bg-gray-200 p-2 rounded-lg">
            <IoClose className="text-[1rem]"/>
          </button>
        </div>

        <div className="space-y-4 py-4">

<div className="flex flex-col items-center mt-4">
          <div onClick={handleImageClick} className="cursor-pointer relative">
            {image ? (
              <img src={URL.createObjectURL(image)} className="w-24 h-24 rounded-full object-cover" alt="Preview" />
            ) : user?.images?.[0]?.url ? (
              <img src={user.images[0].url} className="w-24 h-24 rounded-full object-cover" alt="Profile" />
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
                Country
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded mt-1"
                  value={formData.country}
                  onChange={(e) => handleInputChange(e, "country")}
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
        
  <div>
  <label
    className="font-medium text-gray-700 block"
    htmlFor="gender"
  >
    Gender
  </label>
  <select
    name="gender"
    id="gender"
    value={formData.gender}
    onChange={(e) => handleInputChange(e, "gender")}
    className="w-full focus-visible:ring-transparent mt-1"
  >
    <option value="male">Male</option>
    <option value="female">Female</option>
  </select>
</div>
        
        </div>

        <div className="flex justify-end gap-3">
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
  );
};

export default EditProfile;
