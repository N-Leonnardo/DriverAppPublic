import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../../App";

function RegisterForm() {
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const navigate = useNavigate();

  function handleSubmit() {
    if (password === passwordConfirmation) {
      axios
        .post(`${url}/users`, {
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password,
        })
        .then((response) => {
          navigate("/login");
        });
    } else {
      setAlert(true);
      setAlertMessage("Error! Passwords does not match!");
    }
  }
  return (
    <div>
      {alert && (
        <div className="alert alert-error shadow mb-4 text-white font-bold">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{alertMessage}</span>
          </div>
        </div>
      )}
      <div className="card w-96 bg-base-100 shadow ">
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold">Welcome!</h2>
          <p className="text-slate-400 text-sm">
            Welcome to MyDriverApp. Please register here using your email that
            you have access.
            <br />
            Do you already have an account?
            <a href="/login" className="ml-1 text-blue">
              Click here to login.
            </a>
          </p>
          <div className="">
            <div className="flex flex-row">
              <input
                type="text"
                placeholder="First Name"
                className="input input-bordered input-primary w-full max-w-xs mr-1 mb-1"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="input input-bordered input-primary w-full max-w-xs ml-1 mb-1"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered input-primary w-full max-w-xs mb-1"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered input-primary w-full max-w-xs mb-1"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered input-primary w-full max-w-xs mb-1"
              onChange={(e) => {
                setPasswordConfirmation(e.target.value);
              }}
            />
            <div className="flex justify-center">
              <button
                className="btn btn btn-success text-white"
                onClick={(e) => {
                  handleSubmit();
                }}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
