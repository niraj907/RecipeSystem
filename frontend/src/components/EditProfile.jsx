import React, { useRef, useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useAuthStore } from "./store/authStore";
import { toast } from "sonner";

const EditProfile = () => {
  const inputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    images: "",
    country: "",
    gender: "",
  });
  const [image, setImage] = useState(null);
  const [isSaving, setIsSaving] = useState(false); // Track saving state
  const { user, updateProfile } = useAuthStore();

  console.log(user.images);

  console.log(user.password);
  // Prefill form data with user info when the component mounts
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        username: user.username || "",
        images: user.images || "" ,
        country: user.country || "",
        gender: user.gender || "",
      });
    }
  }, [user]);

  // Handle file input click
  const handleImageClick = () => {
    inputRef.current.click();
  };

  // Handle image selection and validation
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file.");
        return;
      }
      setImage(file);
    }
  };

  // Handle input field changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission with setTimeout
  // const handleUpdateProfile = () => {
  //   setIsSaving(true); // Set saving state to true
  //   setTimeout(async () => {
  //     try {
  //       // Create an object to hold the updated profile data
  //       const updatedProfile = { ...formData };

  //       // Add the image to the form data if one is selected
  //       if (image) {
  //         updatedProfile.image = image;
  //       }

  //       // Call the Zustand store's `updateProfile` function
  //       const response = await updateProfile(user._id, updatedProfile);

  //       if (response.success) {
  //         toast.success(response.message);
  //       } else {
  //         toast.error(response.message);
  //       }
  //     } catch (error) {
  //       toast.error("An error occurred while updating your profile.");
  //     } finally {
  //       setIsSaving(false); // Reset saving state
  //     }
  //   }, 1000); // Delay of 1 second
  // };
  const handleUpdateProfile = () => {
    setIsSaving(true);
    setTimeout(async () => {
      try {
        const { email, ...updatedProfile } = formData; // Exclude email from the update
        if (image) updatedProfile.images = image;
  
        const response = await updateProfile(user._id, updatedProfile);
        response.success
          ? toast.success(response.message)
          : toast.error(response.message);
      } catch (error) {
        toast.error("An error occurred while updating your profile.");
      } finally {
        setIsSaving(false);
      }
    }, 1000);
  };
  
  return (
    <div className="w-full py-10 md:py-16 xl:py-20 px-8 mt-[3rem] bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 md:px-12 bg-white shadow-lg rounded-2xl p-6 sm:p-10">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl font-medium text-gray-800">
            Edit Profile
          </h1>

          {/* Image Upload */}
          <div onClick={handleImageClick} className="cursor-pointer relative">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Uploaded Preview"
                className="w-24 h-24 rounded-full object-cover mt-4 sm:mt-0"
              />
            ) : (
              <img
                src={user?.images?.[0]?.url || "/default-profile.png"}
                className="w-24 h-24 rounded-full object-cover mt-4 sm:mt-0"
                alt="User Profile"
              />
            )}
            <input
              type="file"
              ref={inputRef}
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Name Input */}
        <div>
          <label className="font-medium text-gray-700 block my-2" htmlFor="name">
            Name
          </label>
          <Input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full focus-visible:ring-transparent"
          />
        </div>

        {/* Email Input */}
        {/* <div>
          <label
            className="font-medium text-gray-700 block my-2"
            htmlFor="email"
          >
            Email
          </label>
          <Input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full focus-visible:ring-transparent"
          />
        </div> */}

      {/* Email Input */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
<div>
  <label className="font-medium text-gray-700 block my-2" htmlFor="email">
    Email
  </label>
  <Input
    type="email"
    name="email"
    id="email"
    value={formData.email}
    onChange={handleInputChange} // Optional: You can remove this if the field is disabled
    className="w-full bg-gray-100 text-gray-500 cursor-not-allowed focus-visible:ring-transparent"
    disabled // This makes the input field non-editable
  />
</div>


        {/* Username Input */}
        <div>
          <label
            className="font-medium text-gray-700 block my-2"
            htmlFor="username"
          >
            Username
          </label>
          <Input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full focus-visible:ring-transparent"
          />
        </div>
        </div>

        {/* Country and Gender Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              className="font-medium text-gray-700 block my-2"
              htmlFor="country"
            >
              Country
            </label>
            <Input
              type="text"
              name="country"
              id="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full focus-visible:ring-transparent"
            />
          </div>


<div>
  <label
    className="font-medium text-gray-700 block my-2"
    htmlFor="gender"
  >
    Gender
  </label>
  <select
    name="gender"
    id="gender"
    value={formData.gender}
    onChange={handleInputChange}
    className="w-full focus-visible:ring-transparent"
  >
    <option value="male">Male</option>
    <option value="female">Female</option>
  </select>
</div>


        </div>

        {/* Submit Button */}
        <div className="text-right mt-4">
          <Button
            type="submit"
            className={`px-6 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition duration-200 ${
              isSaving ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleUpdateProfile}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
