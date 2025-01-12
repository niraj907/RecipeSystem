import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [input, setInput] = useState({
    email: "",
    password: ""
  });


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
          <div>
            <span className="font-medium">Password</span>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter password"
              className="focus-visible:ring-transparent my-2"
            />
          </div>

          <Button
            className="bg-[#F67A24] hover:bg-[#f67b24de] text-white px-6 py-2 rounded-md transition duration-300 ease-in-out"
            type="submit"
          >
            Login
          </Button>

          <span className="text-center">
            Don't have an account? <Link to={'/Signup'} className="text-[#f67b24]">Signup</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
