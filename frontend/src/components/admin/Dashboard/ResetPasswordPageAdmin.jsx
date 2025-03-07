import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { FaUnlock } from "react-icons/fa"; 
import { Button } from "@/components/ui/button"; 
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useAdminStore } from '../adminStore';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPasswordPageAdmin = () => {

const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const { resetPassword, isLoading } = useAdminStore();
const [showPassword, setShowPassword] = useState(false);
const [ConfirmshowPassword, setConfirmshowPassword] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();
  
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleToggleConfirmPassword = () => {
    setConfirmshowPassword((prevState) => !prevState);
  };

    const handleSubmit = async (e) => {
		e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("All fields are required!");
      return;
    }

		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}
		try {
			await resetPassword(token, password);

			toast.success("Password reset successfully.");
			setTimeout(() => {
				navigate("/admin-login");
			}, 2000);
		} catch (error) {
			console.error(error);
			toast.error(error.message || "Error resetting password");
		}
	};
  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-8 lg:px-16">
      <div className="flex flex-col gap-6 p-6 sm:p-8 bg-[#FEF5EC] rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-center font-bold text-2xl font-serif text-gray-700">
          Reset Password
        </h1>

        <form className="space-y-6 mt-4" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="relative w-full">
            <Input
            type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
			onChange={(e) => setPassword(e.target.value)}
             
              className="pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <FaUnlock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <span
      className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
      onClick={handleTogglePasswordVisibility}
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </span>
          </div>

          <div className="relative w-full">
            <Input
                type={ConfirmshowPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              
              className="pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <FaUnlock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />

            <span
      className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
      onClick={handleToggleConfirmPassword}
    >
      {ConfirmshowPassword ? <FaEyeSlash /> : <FaEye />}
    </span>

          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            disabled = {isLoading}
            className="w-full bg-[#f67b24] text-white py-2 rounded-md hover:bg-[#f67b24e7] transition duration-300"
          >
       {isLoading ? <Loader className='w-6 h-6 animate-spin' /> : "Set New Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}




export default ResetPasswordPageAdmin











