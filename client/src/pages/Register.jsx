import React, { useState } from "react";
import toast from "react-hot-toast";
import api from '../components/config/Api.jsx';


const Register = () => {
  const [formData, setformdata] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    gender: "",
    country: "",
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

  const handleResetForm = () => {
    setformdata({
      fullName: "",
      email: "",
      mobileNumber: "",
      password: "",
      gender: "",
      country: "",
    });
  };

  const validate = () => {
    let Error = {};

    if (formData.fullName.length < 3) {
      Error.fullName = "Name should be More Than 3 Characters";
    } else {
      if (!/^[A-Za-z ]+$/.test(formData.fullName)) {
        Error.fullName = "Only Contain A-Z , a-z and space";
      }
    }

    if (
      !/^[\w\.]+@(gmail|outlook|ricr|yahoo)\.(com|in|co.in)$/.test(
        formData.email
      )
    ) {
      Error.email = "Use Proper Email Format";
    }

    if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      Error.mobileNumber = "Only Indian Mobile Number allowed";
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

    console.log(formData);
    

    try {
      const res = await api.post("/auth/register", formData);
      
      toast.success(res.data.message);
      handleResetForm();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <div className="relative  w-screen md:w-screen flex items-center justify-center h-screen">
        {/* Background Image */}
        
        {/* Login Form */}
        <div className="relative z-10 flex w-full   h-full">
          <form
            onSubmit={handleSubmit}
            onReset={handleResetForm}
            className="p-8 rounded-xl ms-30 w-80"
          >
            <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Fullname"
              required
              className="w-full mb-4 p-2 rounded border-2 border-gray-400 focus:outline-none  focus:border-green-500 transition"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full mb-4 p-2 border-2 rounded border-gray-400 focus:outline-none focus:border-green-500 transition"
            />
            <input
              type="tel"
              name="mobileNumber"
              id="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Mobile Number"
              required
              className="w-full mb-4 p-2 border-2 rounded border-gray-400 focus:outline-none focus:border-green-500 transition"
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create Password"
              required
              className="w-full mb-4 p-2 rounded border-2 border-gray-400 focus:outline-none  focus:border-green-500 transition"
            />
            <div className="flex gap-3 mb-4  ">
              <input
                type="radio"
                name="gender"
                value="male"
                id="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
              />
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                name="gender"
                value="female"
                id="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
              />
              <label htmlFor="female">Female</label>
              <input
                type="radio"
                name="gender"
                value="other"
                id="other"
                checked={formData.gender === "other"}
                onChange={handleChange}
              />
              <label htmlFor="other">Other</label>
            </div>
            <div>
              <select
                name="country"
                id="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full mb-4  border rounded p-2 border-gray-400 focus:outline-none focus:border-green-500 transition"
              >
                <option value="">Select Country</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
              </select>
            </div>

            <button
              type="reset"
              className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800 mb-4"
            >
              Reset
            </button>
            <button
              type="submit"
              className="w-full bg-cyan-600 text-white py-2 rounded hover:bg-cyan-800"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
