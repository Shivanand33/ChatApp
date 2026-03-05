import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/api";
import { useNavigate } from "react-router-dom";
import { useGoogleAuth } from "../config/GoogleAuth";
import { FcGoogle } from "react-icons/fc";
import { Mail, Lock, LogIn, RotateCcw, ShieldCheck } from "lucide-react"; // Modern Icons

const Login = () => {
  const navigate = useNavigate();
  const { isLoading: googleLoading, error: googleError, isInitialized, signInWithGoogle } = useGoogleAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [Loading, setLoading] = useState(false);

  const handleGoogleSuccess = async (userData) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/googleLogin", userData);
      toast.success(res.data.message);
      sessionStorage.setItem("AppUser", JSON.stringify(res.data.data));
      handleClearForm();
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const GoogleLogin = () => {
    signInWithGoogle(handleGoogleSuccess, handleGoogleFailure);
  };

  const handleGoogleFailure = (error) => {
    toast.error("Google login failed. Please try again.");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearForm = () => {
    setFormData({ email: "", password: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", formData);
      toast.success(res.data.message);
      sessionStorage.setItem("AppUser", JSON.stringify(res.data.data));
      handleClearForm();
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-300 via-base-200 to-primary/10 px-4 py-12 relative overflow-hidden">
      {/* Background Decorative Blob */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-primary/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-secondary/5 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-md z-10">
        <div className="card bg-base-100/70 backdrop-blur-xl shadow-2xl border border-white/10">
          <div className="card-body p-8">
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <LogIn className="text-primary w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-base-content">
                Welcome Back
              </h2>
              <p className="text-base-content/60 mt-2">Please enter your details 👋</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} onReset={handleClearForm} className="space-y-5">
              
              {/* Email Field */}
              <div className="form-control w-full">
                <label className="label py-1">
                  <span className="label-text font-medium">Email Address</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-base-content/40" />
                  <input
                    type="email"
                    name="email"
                    placeholder="name@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={Loading}
                    required
                    className="input input-bordered w-full pl-11 focus:border-primary transition-all duration-200 bg-base-100/50"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="form-control w-full">
                <div className="flex justify-between items-center">
                  <label className="label py-1">
                    <span className="label-text font-medium">Password</span>
                  </label>
                  <a href="#" className="text-xs text-primary hover:underline">Forgot?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-base-content/40" />
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={Loading}
                    required
                    className="input input-bordered w-full pl-11 focus:border-primary transition-all duration-200 bg-base-100/50"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="reset"
                  disabled={Loading}
                  className="btn btn-ghost border-base-300 flex-1 gap-2 text-base-content/70"
                >
                  <RotateCcw className="w-4 h-4" />
                  Clear
                </button>

                <button
                  type="submit"
                  disabled={Loading}
                  className="btn btn-primary flex-[2] gap-2 shadow-lg shadow-primary/20"
                >
                  {Loading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="divider text-xs text-base-content/40 my-8 uppercase tracking-widest">Or continue with</div>

            {/* Google Login Section */}
            <div className="space-y-3">
              {googleError ? (
                <button className="btn btn-outline btn-error w-full gap-2 opacity-70" disabled>
                  <FcGoogle className="text-xl" />
                  {googleError}
                </button>
              ) : (
                <button
                  onClick={GoogleLogin}
                  disabled={!isInitialized || googleLoading || Loading}
                  className="btn btn-outline w-full gap-3 font-medium hover:bg-base-200 border-base-300 group transition-all"
                >
                  {googleLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      <FcGoogle className="text-xl group-hover:scale-110 transition-transform" />
                      Sign in with Google
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 flex flex-col gap-2">
          <p className="text-sm text-base-content/60 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-success" /> 
            Secure authentication powered by API
          </p>
          <p className="text-sm">
            Don't have an account? 
            <button onClick={() => navigate("/register")} className="text-primary font-semibold ml-1 hover:underline">
              Create one
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;