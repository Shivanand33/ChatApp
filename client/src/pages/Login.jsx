import React, { useState } from "react";
import api from "../components/config/Api.jsx";
import toast from "react-hot-toast";
import Register from "./Register.jsx";
 import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setformdata] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    let Error = {};

    if (
      !/^[\w\.]+@(gmail|outlook|ricr|yahoo)\.(com|in|co.in)$/.test(
        formData.email
      )
    ) {
      Error.email = "Use Proper Email Format";
    }

    setValidationError(Error);

    return Object.keys(Error).length > 0 ? false : true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validate()) {
      setIsLoading(false);
      toast.error("Fill the Form Correctly");
      return;
    }

    try {
      const res = await api.post("/auth/login", formData);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Background only for Login page section (Header safe) */}
      <div className="flex justify-center items-center py-10 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Login Account
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Welcome back! Please login to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter Your Email"
              className="w-full mt-1 text-black border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            />
            {validationError.email && (
              <p className="text-red-500 text-xs mt-1">
                {validationError.email}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter Password"
              className="w-full mt-1 text-black border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 rounded-xl font-semibold shadow-md hover:opacity-90 transition duration-300 disabled:opacity-60"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-black  text-sm mt-2">
            Don’t have an account?{" "}
            <span    >
               <Link className="text-blue font-semibold cursor-pointer hover:underline hover:to-blue-600 active:to-blue-700" 
              to="/register">Register</Link>
             
            </span>
          </p>
        </form>

      {/* Google login button */}
      

      </div>
    </div>
    </>
  );
};

export default Login;
