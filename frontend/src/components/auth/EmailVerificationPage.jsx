import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    // Allow only numeric input
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];

    if (value.length > 1) {
      // Handle pasted content and filter out non-numeric characters
      const pastedCode = value.slice(0, 6).replace(/\D/g, "").split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      // Focus on the last non-empty input or the first empty one
      const focusIndex = pastedCode.findIndex((digit) => digit === undefined) === -1 ? 5 : pastedCode.findIndex((digit) => digit === undefined);
      inputRefs.current[focusIndex]?.focus();
    } else {
      // Handle single-character input
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input field if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredCode = code.join("");
    console.log("Entered Code:", enteredCode);

    // Add your verification logic here
    if (enteredCode.length === 6) {
      alert("Code verified successfully!");
      navigate("/next-page"); // Navigate to the next page after verification
    } else {
      alert("Please complete the verification code!");
    }
  };

  return (
    <div className="flex items-center w-screen h-screen justify-center">
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
                onPaste={(e) => handleChange(index, e.clipboardData.getData("text"))}
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
