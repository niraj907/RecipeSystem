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
import { useForm, Controller } from "react-hook-form";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const { signup, isLoading } = useAuthStore();

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const setImagesHandler = (files) => {
    setImages(files);
  };

  const onSubmit = async (data) => {
    if (images.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    try {
      await signup(
        data.name,
        data.email,
        data.password,
        data.username,
        images,
        data.country,
        data.gender
      );
      toast.success("Signup successful!");
      navigate("/verify-email");
    } catch (error) {
      console.error(error);
      toast.error(error.response ? error.response.data.message : "Something went wrong!");
    }
  };

  return (
    <div className="w-full py-10 px-4">
      <div className="flex items-center justify-center">
      <form
  data-testid="signup-form"
  onSubmit={handleSubmit(onSubmit)}
  className="w-full max-w-[30rem] md:max-w-[25rem] lg:max-w-[30rem] shadow-lg p-6 sm:p-8 flex flex-col gap-5 bg-white rounded-md"
>
          <h1 className="text-center font-bold text-2xl sm:text-3xl font-serif text-[#F67A24]">
            Sign up
          </h1>

          <div>
            <span className="font-medium">Name</span>
            <Input
              type="text"
              placeholder="Enter name"
              className="focus-visible:ring-transparent my-2"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

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
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="relative">
            <span className="font-medium">Password</span>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="focus-visible:ring-transparent my-2"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters long",
                },
              })}
            />
            <span
              className="absolute right-4 top-[65%] translate-y-[-50%] cursor-pointer text-gray-600"
              onClick={handleTogglePasswordVisibility}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div>
            <span className="font-medium">Username</span>
            <Input
              type="text"
              placeholder="Enter username"
              className="focus-visible:ring-transparent my-2"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>

          <div>
            <Uploader images={images.length} onFilesSelected={setImagesHandler} />
            {images.length > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                Selected Images: {images.map((file) => file.name).join(", ")}
              </p>
            )}
          </div>

          <div>
            <span className="font-medium">Country</span>
            <Input
              type="text"
              placeholder="Enter country"
              className="focus-visible:ring-transparent my-2"
              {...register("country", { required: "Country is required" })}
            />
            {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
          </div>

          <div>
            <span className="font-medium">Gender</span>
            <Controller
              name="gender"
              control={control}
              defaultValue=""
              rules={{ required: "Gender is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
          </div>

          <Button
            className="bg-[#F67A24] hover:bg-[#f67b24de] text-white px-6 py-2 rounded-md transition duration-300 ease-in-out"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Loader className="animate-spin mx-auto" size={24} /> : "Sign up"}
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