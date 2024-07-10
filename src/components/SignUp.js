import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { checkValid } from "../utils/validate.js";
import { toast } from "react-toastify";

const Signup = () => {
  const [errMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const res = checkValid(password, email);
    setErrorMessage(res);
    toast(res);
    if (res !== null) return;

    try {
      const userData = {
        username,
        email,
        password,
      };
      const response = await Axios.post(
        "https://tsm-spf0.onrender.com/signup",
        userData
      );
      setErrorMessage("SignUp Successful");
      navigate("/api/v1/login");
      toast("SignUp Successful");
    } catch (error) {
      setErrorMessage("SignUp failure");
      throw error;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 my-3 rounded shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              <AiOutlineUser className="inline-block mr-2" />
              Your Name
            </label>
            <input
              type="text"
              id="username"
              ref={usernameRef}
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              <AiOutlineMail className="inline-block mr-2" />
              Your Email
            </label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              <AiOutlineLock className="inline-block mr-2" />
              Your Password
            </label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <p className="text-red-600 font-bold text-lg ">{errMessage}</p>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
          >
            Sign Up
          </button>
          <Link to="/api/v1/login">
            <h3 className="p-2">
              Already have an Account? <b>Login</b>
            </h3>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
