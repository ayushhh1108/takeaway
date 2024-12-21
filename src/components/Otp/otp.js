import React, { useState, useRef } from "react";
import "./index.css";

const OTPInput = ({ length = 6 }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputs = useRef([]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    // Only allow single digit input
    
    if(value?.length === 2  && !otp[5]){
      const newOtp = [...otp];
      newOtp[index+1] = value[1];
      setOtp(newOtp);
      inputs.current[index + 2].focus();
    }         
    if (value.match(/^\d$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input if the current input is filled
      if (index < length - 1 && value !== "") {
        inputs.current[index + 1].focus();
      }
    }

    // Handle backspace
    if (value === "" && index != -1) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if(index > 0){
        inputs.current[index - 1].focus(); // Move focus to previous input
      }
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace when the input is already empty
    if (e.key === "Backspace" && otp[index] === "") {
      // Move focus to previous input if current input is empty
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {otp.map((_, index) => (
        <input
          key={index}
          type="number"
          maxLength="1"
          value={otp[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputs.current[index] = el)}
          className="input"
          style={{
            width: "40px",
            height: "40px",
            margin: "0 5px",
            textAlign: "center",
            fontSize: "18px",
            border: "1px solid #9f8e7c",
            borderRadius: "4px",
            backgroundColor: "transparent",
          }}
        />
      ))}
    </div>
  );
};

const OTP = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleMobileNumberSubmit = (e) => {
    e.preventDefault();
    // Here you could send the mobile number to an API to send an OTP
    // For demo purposes, just show OTP input
    setShowOtpInput(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <OTPInput length={6} />
      </div>
    </div>
  );
};

export default OTP;
