import React, { useState } from "react";
import RegisterForm from "../components/Register/RegisterForm";

function Register() {
  return (
    <div className="flex justify-center items-center h-screen bg-slate-800">
      <RegisterForm />
    </div>
  );
}

export default Register;
