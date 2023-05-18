import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { Axios } from "axios";
import { url } from "../../App";
import Cookies from "js-cookie";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  axios.defaults.withCredentials = true;

  function handleSubmit() {
    if (email.length > 3 && password.length > 3) {
      axios
        .post(`${url}/users/login`, {
          email: email,
          password: password,
        })
        .then((response) => {
          Cookies.set("token", response.data.token, { expires: 1 });
          navigate("/dashboard");
        });
    }
  }

  return (
    <div className="card w-96 bg-base-100 shadow ">
      <div className="card-body">
        <h2 className="card-title text-3xl font-bold">Login</h2>
        <p className="text-slate-400 text-sm">
          Welcome to MyDriverApp. Use your email and password to login.
        </p>
        <input
          type="text"
          placeholder="Email"
          className="input input-bordered input-primary w-full max-w-xs"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered input-primary w-full max-w-xs"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="flex justify-between">
          <button
            className="btn text-white"
            onClick={(e) => {
              navigate("/register");
            }}
          >
            Register
          </button>
          <button
            className="btn btn btn-success text-white"
            onClick={(e) => {
              handleSubmit();
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
