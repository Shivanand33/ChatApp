import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/api";
import { User, Mail, Phone, Lock, UserPlus, RotateCcw } from "lucide-react"; // Icons for better UI

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearForm = () => {
    setFormData({
      fullName: "",
      email: "",
      mobileNumber: "",
      password: "",
      confirmPassword: "",
    });
    setValidationError({});
  };

  const validate = () => {
    let Error = {};
    if (formData.fullName.length < 3) {
      Error.fullName = "Name should be more than 3 characters";
    } else if (!/^[A-Za-z ]+$/.test(formData.fullName)) {
      Error.fullName = "Only alphabets and spaces allowed";
    }

    if (!/^[\w\.]+@(gmail|outlook|ricr|yahoo)\.(com|in|co.in)$/.test(formData.email)) {
      Error.email = "Use proper email format";
    }

    if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      Error.mobileNumber = "Only Indian mobile numbers allowed";
    }

    if (formData.password !== formData.confirmPassword) {
      Error.confirmPassword = "Passwords do not match";
    }

    setValidationError(Error);
    return Object.keys(Error).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validate()) {
      setIsLoading(false);
      toast.error("Fill the form correctly");
      return;
    }

    try {
      const res = await api.post("/auth/register", formData);
      toast.success(res.data.message);
      handleClearForm();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-300 via-base-200 to-primary/10 px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Decorative Element */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 blur-3xl rounded-full -z-10"></div>

        <div className="card bg-base-100/80 backdrop-blur-md shadow-2xl border border-white/10">
          <div className="card-body p-8">
            <div className="text-center mb-8">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <UserPlus className="text-primary w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-base-content">Create Account</h2>
              <p className="text-base-content/60 mt-2">Join us today! It only takes a minute. 🫡</p>
            </div>

            <form onSubmit={handleSubmit} onReset={handleClearForm} className="space-y-5">
              
              {/* Full Name */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium">Full Name</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-5 w-5 text-base-content/40" />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={`input input-bordered w-full pl-11 focus:border-primary transition-all ${validationError.fullName ? 'input-error' : ''}`}
                  />
                </div>
                {validationError.fullName && (
                  <label className="label h-6">
                    <span className="label-text-alt text-error font-medium">{validationError.fullName}</span>
                  </label>
                )}
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium">Email Address</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-base-content/40" />
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={`input input-bordered w-full pl-11 focus:border-primary transition-all ${validationError.email ? 'input-error' : ''}`}
                  />
                </div>
              </div>

              {/* Mobile */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium">Mobile Number</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 h-5 w-5 text-base-content/40" />
                  <input
                    type="tel"
                    name="mobileNumber"
                    placeholder="9876543210"
                    maxLength="10"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="input input-bordered w-full pl-11 focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Passwords Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label py-1">
                    <span className="label-text font-medium">Password</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-base-content/40" />
                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="input input-bordered w-full pl-11 focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label py-1">
                    <span className="label-text font-medium">Confirm</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-base-content/40" />
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={`input input-bordered w-full pl-11 focus:border-primary transition-all ${validationError.confirmPassword ? 'input-error' : ''}`}
                    />
                  </div>
                </div>
              </div>
              {validationError.confirmPassword && (
                <p className="text-error text-xs font-medium pl-1">{validationError.confirmPassword}</p>
              )}

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <button
                  type="reset"
                  disabled={isLoading}
                  className="btn btn-ghost border-base-300 flex-1 gap-2 order-2 sm:order-1"
                >
                  <RotateCcw className="w-4 h-4" />
                  Clear
                </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary flex-[2] gap-2 shadow-lg shadow-primary/20 order-1 sm:order-2"
                >
                  {isLoading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    <>
                      Create Account
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <p className="text-center text-sm text-base-content/50 mt-8 flex items-center justify-center gap-2">
          <Lock className="w-3 h-3" /> Your data is encrypted and secure
        </p>
      </div>
    </div>
  );
};

export default Register;