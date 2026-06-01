import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [validation, setValidation] = useState({
    name: { valid: false, message: "" },
    email: { valid: false, message: "" },
    password: { valid: false, message: "" }
  });
  const navigate = useNavigate();
  const location = useLocation();

  // Handle Google OAuth callback
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    const name = urlParams.get('name');
    const error = urlParams.get('error');

    if (token) {
      localStorage.setItem('token', token);
      Swal.fire({
        icon: 'success',
        title: 'Welcome to Rajkumar Catering Services!',
        text: `Successfully signed in${name ? ` as ${decodeURIComponent(name)}` : ''}`,
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        navigate('/');
      });
    } else if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Google Authentication Failed',
        text: 'Please try again or use manual signup'
      });
    }
  }, [location, navigate]);



  const validateName = (name) => {
    if (!name.trim()) return { valid: false, message: "Name is required" };
    if (name.length < 2) return { valid: false, message: "Name must be at least 2 characters" };
    return { valid: true, message: "" };
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return { valid: false, message: "Email is required" };
    if (!emailRegex.test(email)) return { valid: false, message: "Invalid email format" };
    return { valid: true, message: "" };
  };

  const validatePassword = (password) => {
    if (!password) return { valid: false, message: "Password is required" };
    if (password.length < 6) return { valid: false, message: "Password must be at least 6 characters" };
    if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) return { valid: false, message: "Password must contain uppercase and lowercase letters" };
    return { valid: true, message: "" };
  };

  const checkEmailExists = async (email) => {
    if (!validateEmail(email).valid) return;
    
    setCheckingEmail(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/check-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setEmailExists(data.exists);
    } catch (err) {
      console.error("Email check failed:", err);
    } finally {
      setCheckingEmail(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (form.email) checkEmailExists(form.email);
    }, 500);
    return () => clearTimeout(timer);
  }, [form.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    let newValidation = { ...validation };
    switch (name) {
      case "name":
        newValidation.name = validateName(value);
        break;
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
    return validation.name.valid && 
           validation.email.valid && 
           validation.password.valid && 
           !emailExists;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setLoading(true);
    
    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        await Swal.fire({
          icon: 'success',
          title: 'Account Created!',
          text: 'Please login with your credentials',
          timer: 2000,
          showConfirmButton: false
        });
        
        navigate("/login");
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Signup Failed',
          text: data.message || "Something went wrong"
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

  return (
    <div className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-x-hidden px-4 sm:px-6 lg:px-8 py-8">
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/back.jpg')" }}
        aria-hidden="true"
      />

      <div className="bg-white/95 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-2xl w-full max-w-md border border-white/20 my-4">
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Create Account</h2>
          <p className="text-gray-600 text-xs sm:text-sm">Join us for amazing catering services</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              name="name" 
              placeholder="Enter your full name" 
              value={form.name} 
              onChange={handleChange} 
              className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 text-sm ${
                validation.name.message && form.name ? 
                (validation.name.valid ? 'border-green-300 focus:ring-green-500' : 'border-red-300 focus:ring-red-500') :
                'border-gray-300 focus:ring-amber-500'
              }`}
              required 
            />
            {validation.name.message && form.name && (
              <p className={`text-xs mt-1 ${validation.name.valid ? 'text-green-600' : 'text-red-600'}`}>
                {validation.name.message}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <input 
                type="email" 
                name="email" 
                placeholder="Enter your email" 
                value={form.email} 
                onChange={handleChange} 
                className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 text-sm ${
                  validation.email.message && form.email ? 
                  (validation.email.valid && !emailExists ? 'border-green-300 focus:ring-green-500' : 'border-red-300 focus:ring-red-500') :
                  'border-gray-300 focus:ring-amber-500'
                }`}
                required 
              />
              {checkingEmail && (
                <div className="absolute right-2 top-2 sm:right-3 sm:top-3">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            {validation.email.message && form.email && (
              <p className={`text-xs mt-1 ${validation.email.valid && !emailExists ? 'text-green-600' : 'text-red-600'}`}>
                {emailExists ? 'Email already exists' : validation.email.message}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                name="password" 
                placeholder="Create a password" 
                value={form.password} 
                onChange={handleChange} 
                className={`w-full px-3 py-2 pr-10 sm:px-4 sm:py-3 sm:pr-12 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 text-sm ${
                  validation.password.message && form.password ? 
                  (validation.password.valid ? 'border-green-300 focus:ring-green-500' : 'border-red-300 focus:ring-red-500') :
                  'border-gray-300 focus:ring-amber-500'
                }`}
                required 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 sm:right-3 sm:top-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          
          <div className="flex items-center">
            <input type="checkbox" className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded" required />
            <span className="ml-2 text-xs text-gray-600">
              I agree to the <button 
                type="button"
                onClick={() => {
                  Swal.fire({
                    title: '📋 Terms & Conditions',
                    html: `
                      <div class="text-left text-sm max-h-96 overflow-y-auto">
                        <h3 class="font-bold mb-3">Rajkumar Catering Services - Terms & Conditions</h3>
                        
                        <h4 class="font-semibold mb-2">1. Service Agreement</h4>
                        <p class="mb-3">By booking our catering services, you agree to these terms and conditions. All bookings are subject to availability and confirmation.</p>
                        
                        <h4 class="font-semibold mb-2">2. Pricing & Payment</h4>
                        <p class="mb-3">• Fixed rate: ₹250 per guest (including 18% GST)<br>
                        • 30% advance payment required to confirm booking<br>
                        • Remaining 70% due on event day<br>
                        • Prices may vary for special dietary requirements</p>
                        
                        <h4 class="font-semibold mb-2">3. Booking & Cancellation</h4>
                        <p class="mb-3">• Minimum 7 days advance booking required<br>
                        • Cancellations 48+ hours: Full refund of advance<br>
                        • Cancellations 24-48 hours: 50% refund<br>
                        • Cancellations <24 hours: No refund</p>
                        
                        <h4 class="font-semibold mb-2">4. Food Safety & Quality</h4>
                        <p class="mb-3">• Fresh ingredients used daily<br>
                        • FSSAI certified kitchen<br>
                        • Hygienic food preparation and delivery<br>
                        • Special dietary needs accommodated with advance notice</p>
                        
                        <h4 class="font-semibold mb-2">5. Delivery & Setup</h4>
                        <p class="mb-3">• Free delivery within 10km radius<br>
                        • Additional charges for remote locations<br>
                        • Setup and cleanup services available<br>
                        • Customer responsible for venue arrangements</p>
                        
                        <h4 class="font-semibold mb-2">6. Liability</h4>
                        <p class="mb-3">• Rajkumar Catering Services is not liable for venue-related issues<br>
                        • Customer responsible for guest count accuracy<br>
                        • Force majeure events may affect service delivery</p>
                        
                        <h4 class="font-semibold mb-2">7. Privacy Policy</h4>
                        <p class="mb-3">• Personal information used only for service delivery<br>
                        • No data shared with third parties<br>
                        • Contact details used for booking communication</p>
                        
                        <h4 class="font-semibold mb-2">8. Contact Information</h4>
                        <p class="mb-3">For queries or support:<br>
                        📧 Email: anilkumarsingh43425@gmail.com<br>
                        📞 Phone: +91-9918309983<br>
                        🌐 Contact: +91 9918309983</p>
                        
                        <div class="bg-amber-50 p-3 rounded mt-4">
                          <p class="text-amber-800 text-xs">Last updated: ${new Date().toLocaleDateString()}</p>
                        </div>
                      </div>
                    `,
                    confirmButtonText: 'I Understand',
                    confirmButtonColor: '#f59e0b',
                    width: '600px',
                    customClass: {
                      popup: 'text-left'
                    }
                  });
                }}
                className="text-amber-600 hover:text-amber-500 underline"
              >
                Terms & Conditions
              </button>
            </span>
          </div>
          
          <button 
            type="submit" 
            disabled={loading || !isFormValid()}
            className="w-full py-2 sm:py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
            ) : "Create Account"}
          </button>
        </form>
        
        {/* Divider */}
        <div className="mt-4 sm:mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
        </div>
        
        {/* Google Login Button */}
        <div className="mt-4 sm:mt-6">
          <button
            type="button"
            onClick={() => {
              const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
              
              if (!clientId || clientId === 'YOUR_GOOGLE_CLIENT_ID') {
                Swal.fire({
                  icon: 'info',
                  title: '🔧 Google Login Setup (100% FREE)',
                  html: `
                    <div class="text-left text-sm">
                      <div class="bg-green-50 p-3 rounded mb-4">
                        <p class="text-green-800 font-semibold">✅ Google OAuth is completely FREE!</p>
                        <p class="text-green-700 text-xs">No charges for normal website usage</p>
                      </div>
                      
                      <p><strong>Quick Setup (5 minutes):</strong></p>
                      <br>
                      <ol class="list-decimal list-inside space-y-2">
                        <li>Visit <a href="https://console.cloud.google.com" target="_blank" class="text-blue-600 underline">Google Cloud Console</a></li>
                        <li>Create new project: "Catering Website"</li>
                        <li>Enable "Google+ API" from APIs & Services</li>
                        <li>Create "OAuth 2.0 Client ID" credentials</li>
                        <li>Add these authorized origins:<br>
                            <code class="bg-gray-100 px-1 text-xs">http://localhost:5000</code><br>
                            <code class="bg-gray-100 px-1 text-xs">https://yourdomain.com</code>
                        </li>
                        <li>Add redirect URI:<br>
                            <code class="bg-gray-100 px-1 text-xs">http://localhost:5000/api/auth/google/callback</code>
                        </li>
                        <li>Copy Client ID and Secret to .env files</li>
                        <li>Restart development server</li>
                      </ol>
                      <br>
                      <div class="bg-blue-50 p-3 rounded">
                        <p class="text-blue-800 text-xs">💡 <strong>When hosting:</strong> Update URLs to your domain</p>
                      </div>
                      <br>
                      <p class="text-gray-600">Meanwhile, use manual signup above 👆</p>
                    </div>
                  `,
                  confirmButtonText: 'Got it! Will setup later',
                  width: '500px'
                });
                return;
              }
              
              // Redirect to Google OAuth
              window.location.href = `${API_URL}/api/auth/google`;
            }}
            disabled={loading}
            className="w-full flex items-center justify-center px-4 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm sm:text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google 
          </button>
        </div>
        
        <div className="mt-4 sm:mt-6 text-center">
          <p className="text-gray-600 text-xs sm:text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-amber-600 hover:text-amber-500 font-semibold transition duration-200">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}