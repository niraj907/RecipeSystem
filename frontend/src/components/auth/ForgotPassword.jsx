import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader, Mail } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isLoading, forgotPassword } = useAuthStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await forgotPassword(email);
		setIsSubmitted(true);
	};

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-[#FEF5EC] rounded-lg shadow-md p-6 sm:p-8">
        <h1 className="text-center font-bold text-2xl font-serif">Forgot Password</h1>

        {!isSubmitted ? (
          <form className="space-y-6 mt-4" onSubmit={handleSubmit}>
        <h2 className="text-center text-sm sm:text-base text-gray-600 leading-relaxed">
          Enter your email address and we'll send you a link to reset your password.
        </h2>
            <div className="flex flex-col  items-center sm:items-stretch gap-4">
              <div className="relative w-full">
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md focus-visible:ring-transparent w-full"
                />
                <Mail className="absolute top-1/2 left-3 transform -translate-y-1/2  text-gray-400" />
              </div>
              <Button  className="bg-white text-gray-400 hover:bg-[#F9C8C8] hover:bg-opacity-50 w-full sm:w-auto flex flex-row">
                {isLoading ? <Loader className="size-6 animate-spin mx-auto" /> : "Send Reset Link"}
              </Button>
            </div>
          </form>
        ) : (
          <div className="text-center mt-6">
            <Mail className="h-8 w-8 text-gray-500 mx-auto" />
            <p className="text-gray-600 mt-4">
              If an account exists for <span className="font-medium">{email}</span>, you will receive a password reset link shortly.
            </p>
          </div>
        )}
      <div className="w-full max-w-md mt-4">
        <div className="px-6 py-4 bg-[#f67b24]  rounded-lg text-center">
          <Link to="/login" className="text-sm text-white hover:underline flex items-center justify-center">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
          </Link>
        </div>
      </div>

      </div>

    </div>
  );
};

export default ForgotPassword;
