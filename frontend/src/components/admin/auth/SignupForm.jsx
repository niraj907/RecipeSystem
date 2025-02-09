import { Input } from '@/components/ui/input';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import Uploader from '@/components/Uploader/Uploader';

const SignupForm = () => {

    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
      };

  return (
    <div className="w-full py-8 px-4 ">
      <div className="flex items-center justify-center">
        <form
      
          className="w-full max-w-[30rem] md:max-w-[25rem] lg:max-w-[30rem] shadow-lg p-6 sm:p-8 flex flex-col gap-5 bg-white rounded-md"
        >
          <h1 className="text-center font-bold text-2xl sm:text-3xl font-serif text-[#F67A24]">
            Sign up
          </h1>

        
          <div>
            <span className="font-medium">Name</span>
            <Input
              type="text"
              name="name"
           
              placeholder="Enter name"
              className="focus-visible:ring-transparent my-2"
            />
          </div>

          <div>
            <span className="font-medium">Email</span>
            <Input
              type="email"
              name="email"
            
              placeholder="Enter email"
              className="focus-visible:ring-transparent my-2"
            />
          </div>

          <div className="relative">
            <span className="font-medium">Password</span>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
           
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
           
              placeholder="Enter username"
              className="focus-visible:ring-transparent my-2"
            />
          </div>

          <div>
            <Uploader/>
           
            
          </div>


          <Button
            className="bg-[#F67A24] hover:bg-[#f67b24de] text-white px-6 py-2 rounded-md transition duration-300 ease-in-out"
            type="submit" 
          >
        Sign up
          </Button>
          <span className="text-center text-sm">
            Already have an account?{" "}
            <Link to={"/admin-login"} className="text-[#f67b24] font-medium">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  )
}

export default SignupForm