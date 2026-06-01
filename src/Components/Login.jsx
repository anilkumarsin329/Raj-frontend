import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [validation, setValidation] = useState({
    email: { valid: false, message: "" },
    password: { valid: false, message: "" }
  });
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return { valid: false, message: "Email is required" };
    if (!emailRegex.test(email)) return { valid: false, message: "Invalid email format" };
    return { valid: true, message: "" };
  };

  const validatePassword = (password) => {
    if (!password) return { valid: false, message: "Password is required" };
    if (password.length < 6) return { valid: false, message: "Password must be at least 6 characters" };
    return { valid: true, message: "" };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    let newValidation = { ...validation };
    switch (name) {
      case "email":
        newValidation.email = validateEmail(value);
        break;
      case "password":
        newValidation.password = validatePassword(value);
        break;
    }
    setValidation(newValidation);
  };

  const isFormValid = () => {
    return validation.email.valid && validation.password.valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setLoading(true);
    
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        await Swal.fire({
          icon: 'success',
          title: 'Welcome Back!',
          text: 'Login successful',
          timer: 1500,
          showConfirmButton: false
        });
        
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        let errorMessage = "Login failed";
        if (res.status === 400) {
          errorMessage = data.message || "Invalid credentials";
        } else if (res.status === 500) {
          errorMessage = "Server error. Please try again later";
        }
        
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: errorMessage
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'Please check your connection and try again'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    await Swal.fire({
      icon: 'success',
      title: 'Reset Link Sent!',
      text: 'Check your email for password reset instructions',
      timer: 3000,
      showConfirmButton: false
    });
    
    setShowForgotPassword(false);
    setForgotEmail("");
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-x-hidden px-4 sm:px-6 lg:px-8 py-8">
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/back.jpg')" }}
        aria-hidden="true"
      />

      <div className="bg-white/95 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
        {!showForgotPassword ? (
          <>
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
              <p className="text-gray-600 text-sm sm:text-base">Sign in to your account</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Enter your email" 
                  value={form.email} 
                  onChange={handleChange} 
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${
                    validation.email.message && form.email ? 
                    (validation.email.valid ? 'border-green-300 focus:ring-green-500' : 'border-red-300 focus:ring-red-500') :
                    'border-gray-300 focus:ring-amber-500'
                  }`}
                  required 
                />
                {validation.email.message && form.email && (
                  <p className={`text-xs mt-1 ${validation.email.valid ? 'text-green-600' : 'text-red-600'}`}>
                    {validation.email.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    name="password" 
                    placeholder="Enter your password" 
                    value={form.password} 
                    onChange={handleChange} 
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${
                      validation.password.message && form.password ? 
                      (validation.password.valid ? 'border-green-300 focus:ring-green-500' : 'border-red-300 focus:ring-red-500') :
                      'border-gray-300 focus:ring-amber-500'
                    }`}
                    required 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {validation.password.message && form.password && (
                  <p className={`text-xs mt-1 ${validation.password.valid ? 'text-green-600' : 'text-red-600'}`}>
                    {validation.password.message}
                  </p>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded" />
                  <span className="ml-2 text-xs sm:text-sm text-gray-600">Remember me</span>
                </label>
                <button 
                  type="button" 
                  onClick={() => setShowForgotPassword(true)}
                  className="text-xs sm:text-sm text-amber-600 hover:text-amber-500 font-medium"
                >
                  Forgot password?
                </button>
              </div>
              
              <button 
                type="submit" 
                disabled={loading || !isFormValid()}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                ) : "Sign In"}
              </button>
            </form>
            
            <div className="mt-6 sm:mt-8 text-center">
              <p className="text-gray-600 text-sm sm:text-base">
                Don't have an account?{" "}
                <Link to="/signup" className="text-amber-600 hover:text-amber-500 font-semibold transition duration-200">
                  Create Account
                </Link>
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Reset Password</h2>
              <p className="text-gray-600 text-sm sm:text-base">Enter your email to receive reset link</p>
            </div>
            
            <form onSubmit={handleForgotPassword} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={forgotEmail} 
                  onChange={(e) => setForgotEmail(e.target.value)} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200" 
                  required 
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Send Reset Link
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <button 
                onClick={() => setShowForgotPassword(false)}
                className="text-amber-600 hover:text-amber-500 font-medium transition duration-200 text-sm sm:text-base"
              >
                ← Back to Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}