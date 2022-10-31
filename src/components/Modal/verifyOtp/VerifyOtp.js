import React, { useState } from "react";
import ReactInputVerificationCode from "react-input-verification-code";
export const VerifyOtp = () => {
  const [value, setValue] = useState("");
  const hanleChange = (data) => {
    // console.log(data);
    setValue(data);
  };
  return (
    <div>
      <ReactInputVerificationCode
        length={6}
        autoFocus
        placeholder=""
        hanleChange={hanleChange}
        onCompleted={console.log}
        value={value}
      />
    </div>
  );
};
