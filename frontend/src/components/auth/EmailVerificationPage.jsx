import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuthStore } from "../store/authStore";
import { toast } from "sonner";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

const { error, isLoading , verifyEmail} = useAuthStore();

  const handleChange = (index, value) => {
      //   // Allow only numeric input
    if (!/^\d*$/.test(value)) return;
		const newCode = [...code];

		// Handle pasted content
		if (value.length > 1) {
			const pastedCode =value.slice(0, 6).replace(/\D/g, "").split("");
			for (let i = 0; i < 6; i++) {
				newCode[i] = pastedCode[i] || "";
			}
			setCode(newCode);

			// Focus on the last non-empty input or the first empty one
			const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
			const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
			inputRefs.current[focusIndex].focus();
		} else {
			newCode[index] = value;
			setCode(newCode);

			// Move focus to the next input field if value is entered
			if (value && index < 5) {
				inputRefs.current[index + 1].focus();
			}
		}
	};

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };



  const handleSubmit = async(e) => {
    e.preventDefault();
    // Check if all the fields are filled
    if (code.some(digit => digit === "")) {
      toast.error("Please fill in all the fields.");
        return;
    }

    const verificationCode = code.join("");
   try {
    await verifyEmail(verificationCode);
    navigate("/login");
    toast.success("Email verified sucessfully");
   } catch (error) {
       toast.error(error.response ? error.response.data.message : "Something went wrong Email verified!");
   }
};


  // auto submit when all field are filled
  useEffect(()=>{
    if(code.every(digit => digit !== "")){
      handleSubmit(new Event('submit'));
    }
  },[code]);

  return (
    <div className="flex items-center w-screen h-screen justify-center px-[1rem]">
      <div className="flex flex-col gap-4 p-8 bg-[#FEF5EC] rounded-lg shadow-md">
        <h1 className="text-center font-bold text-2xl font-serif">Verify Your Email</h1>
        <h2 className="text-center">Enter the 6-digit code sent to your email address.</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={(e) => {
                  e.preventDefault(); // Prevent default paste behavior
                  const pastedData = e.clipboardData.getData("text").slice(0, 6).replace(/\D/g, ""); // Clean pasted data
                  const newCode = Array(6).fill(""); // Start with an array of 6 empty strings
                
                  // Fill `newCode` with pasted digits
                  pastedData.split("").forEach((char, i) => {
                    newCode[i] = char;
                  });
                
                  setCode(newCode); // Update the state with the new code
                
                  // Focus on the next input field after the last pasted digit
                  const focusIndex = Math.min(pastedData.length, 5);
                  inputRefs.current[focusIndex]?.focus();
                }}
                
                className="w-12 h-12 text-center text-2xl font-bold bg-[#f67b24de] text-white border-2 border-white rounded-lg focus:border-[#f67b24] focus:outline-none"
              />
            ))}
          </div>
          <Button
            type="submit"
            className="w-full py-2 mt-4 bg-[#f67b24] text-white font-bold rounded-lg hover:bg-[#e5671c]"
          >
            Verify
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
