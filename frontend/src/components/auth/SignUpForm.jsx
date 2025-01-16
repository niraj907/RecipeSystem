import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Uploader from "../Uploader/Uploader";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import { useAuthStore } from "../store/authStore";
import { Loader } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SignUpForm = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    username: "",
    country: "",
    gender: "",
    images: [], // Array to store selected image files
  });

  const navigate = useNavigate();

  const {signup,error, isLoading } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const setImagesHandler = (files) => {
    setInput({ ...input, images: files }); // Update image files in state
  };

  const signupHandler = async (e) => {
    e.preventDefault();
  
    // Validation checks
    if (
      !input.email ||
      !input.password ||
      !input.username ||
      !input.country ||
      !input.gender ||
      input.images.length === 0
    ) {
      toast.error("All fields are required!");
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.email)) {
      toast.error("Please enter a valid email.");
      return;
    }
  
    try {
      // Call the Zustand store function
      await signup(
        input.email,
        input.password,
        input.username,
        input.images,
        input.country,
        input.gender
      );
      toast.success("Signup successful!");
      navigate("/verify-email");
    } catch (error) {
      console.error(error);
      toast.error(error.response ? error.response.data.message : "Something went wrong!");
    }
  };
  

  return (
    <div className="w-full py-10 px-4 mt-12">
      <div className="flex items-center justify-center">
        <form
          onSubmit={signupHandler}
          className="w-full max-w-[30rem] md:max-w-[25rem] lg:max-w-[30rem] shadow-lg p-6 sm:p-8 flex flex-col gap-5 bg-white rounded-md"
        >
          <h1 className="text-center font-bold text-2xl sm:text-3xl font-serif text-[#F67A24]">
            Sign up
          </h1>

          <div>
            <span className="font-medium">Email</span>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Enter email"
              className="focus-visible:ring-transparent my-2"
            />
          </div>

          <div className="relative">
            <span className="font-medium">Password</span>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter password"
              className="focus-visible:ring-transparent my-2"
            />
            <span
              className="absolute right-4 top-[65%] translate-y-[-50%] cursor-pointer text-gray-600"
              onClick={handleTogglePasswordVisibility}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          <div>
            <span className="font-medium">Username</span>
            <Input
              type="text"
              name="username"
              value={input.username}
              onChange={changeEventHandler}
              placeholder="Enter username"
              className="focus-visible:ring-transparent my-2"
            />
          </div>

          <div>
            <Uploader
              images={input.images.length}
              onFilesSelected={setImagesHandler}
            />
            {input.images.length > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                Selected Images:{" "}
                {input.images.map((file) => file.name).join(", ")}
              </p>
            )}
          </div>

          <div>
            <span className="font-medium">Country</span>
            <Input
              value={input.country}
              onChange={changeEventHandler}
              type="text"
              name="country"
              placeholder="Enter country"
              className="focus-visible:ring-transparent my-2"
            />
          </div>

          <div>
            <span className="font-medium">Gender</span>
            <Select
              onValueChange={(value) => setInput({ ...input, gender: value })}
              value={input.gender}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>} */}
          <Button
            className="bg-[#F67A24] hover:bg-[#f67b24de] text-white px-6 py-2 rounded-md transition duration-300 ease-in-out"
            type="submit" disabled ={isLoading}
          >
        {isLoading ? <Loader className="animate-spin mx-auto" size={24}/> :"Sign up" }
          </Button>
          <span className="text-center text-sm">
            Already have an account?{" "}
            <Link to={"/login"} className="text-[#f67b24] font-medium">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
