import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Link } from 'react-router-dom'

const LoginForm = () => {
  return (
    <div className="py-[3rem] px-[3rem] mt-[75px]">
    <div className="flex items-center justify-center">
      <form className="w-[30rem] shadow-lg p-8 flex flex-col gap-4">
        <h1 className="text-center font-bold text-3xl font-serif text-[#F67A24]">Login</h1>

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
<Link to={'/forgot-password'} className='text-[#f67b24de]'>
Forgot Password ?
</Link>
</div>

<Button
      className="bg-[#F67A24] hover:bg-[#f67b24de] text-white px-6 py-2 rounded-md transition duration-300 ease-in-out"
          type="submit" >
        Login
</Button>



        <span className="text-center">
          Don't have an account? <Link to={'/admin-signup'} className="text-[#f67b24de]">Signup</Link>
        </span>
      </form>
    </div>
  </div>
  )
}

export default LoginForm