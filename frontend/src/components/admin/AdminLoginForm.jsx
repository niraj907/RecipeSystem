import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAdminStore } from './adminStore';
import { Loader } from "lucide-react";

const AdminLoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error } = useAdminStore();
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success("Login successful");
      navigate("/dashboard"); // Redirect on successful login
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="py-[7rem] px-[3rem]">
      <div className="flex items-center justify-center">
        <form 
          className="w-[30rem] shadow-lg p-8 flex flex-col gap-4" 
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-center font-bold text-3xl font-serif text-[#F67A24]">
            Admin
          </h1>

          <div>
            <span className="font-medium">Email</span>
            <Input
              type="email"
              placeholder="Enter email"
              className="focus-visible:ring-transparent my-2"
              {...register("email", { 
                required: "Email is required", 
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address"
                }
              })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          
          <div className="relative">
  <label className="font-medium">Password</label>
  <div className="relative">
    <Input
      type={showPassword ? "text" : "password"}
      placeholder="Enter password"
      className="focus:ring-transparent my-2 border rounded-md px-3 py-2 w-full"
      {...register("password", { 
        required: "Password is required", 
        minLength: {
          value: 4,
          message: "Password must be at least 4 characters long"
        }
      })}
    />
    {/* Eye Icon for Show/Hide Password */}
    <span
      className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
      onClick={handleTogglePasswordVisibility}
    >
      {showPassword ? <FaEye /> : <FaEyeSlash />}
    </span>
  </div>
  {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
</div>


          <div>
            <Link to={'/forgot-password-admin'} className='text-[#f67b24de]'>
              Forgot Password ?
            </Link>
          </div>


          <Button
            className="bg-[#F67A24] hover:bg-[#f67b24de] text-white px-6 py-2 rounded-md transition duration-300 ease-in-out"
            type="submit"
            disabled={loading}
          >
            {loading ? <Loader className='w-6 h-6 animate-spin' /> : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginForm;
