import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RiLoader2Fill } from "react-icons/ri";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const isLoading = false;
  const [input, setInput] = useState({
    email: "",
    password: ""
  });

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signupHandler = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!input.email || !input.password) {
      alert("All fields are required!");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.email)) {
      alert("Please enter a valid email.");
      return;
    }

    // Log the form data to the console
    console.log("Form Data Submitted: ", input);
    setInput({ email: "", password: "" });
  };

  return (
    <div className="py-[3rem] px-[3rem] mt-[75px]">
      <div className="flex items-center justify-center">
        <form onSubmit={signupHandler} className="w-[30rem] shadow-lg p-8 flex flex-col gap-5">
          <h1 className="text-center font-bold text-3xl font-serif text-[#F67A24]">Login</h1>

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
  <Link to={'/forgot-password'} className='text-[#f67b24de]'>
  Forgot Password ?
  </Link>
</div>

          <Button
            className="bg-[#F67A24] hover:bg-[#f67b24de] text-white px-6 py-2 rounded-md transition duration-300 ease-in-out"
            type="submit" disabled = {isLoading}
          >
            {isLoading ? <RiLoader2Fill className='w-6 h-6 animate-spin' /> : "Login"}
          </Button>

          <span className="text-center">
            Don't have an account? <Link to={'/Signup'} className="text-[#f67b24de]">Signup</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
