// import React, { useState } from 'react';
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Link } from 'react-router-dom';
// import Uploader from '../Uploader/Uploader';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// const SignUpForm = () => {
//   const [input, setInput] = useState({
//     email: "",
//     password: "",
//     username: "",
//     country: "",
//     gender: "",
//     image: null,
//   });

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const setImageHandler = (files) => {
//     setInput({ ...input, image: files[0] }); // Store the first selected file
//   };

//   const setGenderHandler = (gender) => {
//     setInput({ ...input, gender });
//   };

//   const signupHandler = async (e) => {
//     e.preventDefault();

//     // Basic form validation
//     if (!input.email || !input.password || !input.username || !input.country || !input.gender || !input.image) {
//       alert("All fields are required!");
//       return;
//     }

//     // Email format validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(input.email)) {
//       alert("Please enter a valid email.");
//       return;
//     }

//     // Log the form data to the console
//     console.log("Form Data Submitted: ", input);
//     setInput({ email: "", password: "", username: "", country: "", gender: "", image: null });
//   };

//   return (
//     <div className="py-[3rem] px-[3rem] mt-[75px]">
//       <div className="flex items-center justify-center">
//         <form onSubmit={signupHandler} className="w-[30rem] shadow-lg p-8 flex flex-col gap-5">
//           <h1 className="text-center font-bold text-3xl font-serif text-[#F67A24]">Sign up</h1>

//           <div>
//             <span className="font-medium">Email</span>
//             <Input
//               type="email"
//               name="email"
//               value={input.email}
//               onChange={changeEventHandler}
//               placeholder="Enter email"
//               className="focus-visible:ring-transparent my-2"
//             />
//           </div>
//           <div>
//             <span className="font-medium">Password</span>
//             <Input
//               type="password"
//               name="password"
//               value={input.password}
//               onChange={changeEventHandler}
//               placeholder="Enter password"
//               className="focus-visible:ring-transparent my-2"
//             />
//           </div>
//           <div>
//             <span className="font-medium">Username</span>
//             <Input
//               type="text"
//               name="username"
//               value={input.username}
//               onChange={changeEventHandler}
//               placeholder="Enter username"
//               className="focus-visible:ring-transparent my-2"
//             />
//           </div>

//           <div>
//             <Uploader onFilesSelected={setImageHandler} />
//             {input.image && (
//               <p className="text-sm text-gray-600 mt-2">
//                 Selected File: {input.image.name}
//               </p>
//             )}
//           </div>

//           <div>
//             <span className="font-medium">Country</span>
//             <Input
//               value={input.country}
//               onChange={changeEventHandler}
//               type="text"
//               name="country"
//               placeholder="Enter country"
//               className="focus-visible:ring-transparent my-2"
//             />
//           </div>

//           <div>
//             <span className="font-medium">Gender</span>
//             <Select
//               onValueChange={setGenderHandler}
//               value={input.gender} // Ensure the selected value is reflected in the state
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Select Gender" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="male">Male</SelectItem>
//                 <SelectItem value="female">Female</SelectItem>
//               </SelectContent>
//             </Select>
//             {input.gender && (
//               <p className="text-sm text-gray-600 mt-2">Selected Gender: {input.gender}</p>
//             )}
//           </div>

//           <Button
//             className="bg-[#F67A24] text-[1rem] hover:bg-white hover:text-[#F67A24] ring-0 ring-[#F67A24] ring-inset hover:ring-[#F67A24] hover:ring-4 rounded-md transition-all ease-in-out duration-300"
//             type="submit"
//           >
//             Signup
//           </Button>
//           <span className="text-center">
//             Already have an account? <Link to={'/login'} className="text-[#f67b24]">Login</Link>
//           </span>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUpForm;




import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import Uploader from '../Uploader/Uploader';
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

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const setImagesHandler = (files) => {
    setInput({ ...input, images: files }); // Update image files in state
  };

  const signupHandler = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!input.email || !input.password || !input.username || !input.country || !input.gender || input.images.length === 0) {
      alert("All fields are required!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.email)) {
      alert("Please enter a valid email.");
      return;
    }

    // Log the form data for testing
    console.log("Form Data Submitted: ", {
      ...input,
      images: input.images.map(file => file.name), // Log only image names
    });

    // Reset form
    setInput({
      email: "",
      password: "",
      username: "",
      country: "",
      gender: "",
      images: [],
    });
  };

  return (
    <div className="py-[3rem] px-[3rem] mt-[75px]">
      <div className="flex items-center justify-center">
        <form onSubmit={signupHandler} className="w-[30rem] shadow-lg p-8 flex flex-col gap-5">
          <h1 className="text-center font-bold text-3xl font-serif text-[#F67A24]">Sign up</h1>

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

{/* image */}
          <div>
            <Uploader images = {input.images.length} onFilesSelected={setImagesHandler} />
            {input.images.length > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                Selected Images: {input.images.map(file => file.name).join(", ")}
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
            {input.gender && (
              <p className="text-sm text-gray-600 mt-2">Selected Gender: {input.gender}</p>
            )}
          </div>

          <Button
            className="bg-[#F67A24] text-[1rem] hover:bg-white hover:text-[#F67A24] ring-0 ring-[#F67A24] ring-inset hover:ring-[#F67A24] hover:ring-4 rounded-md transition-all ease-in-out duration-300"
            type="submit"
          >
            Signup
          </Button>
          <span className="text-center">
            Already have an account? <Link to={'/login'} className="text-[#f67b24]">Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;

