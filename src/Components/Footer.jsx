import React, { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email) {
      Swal.fire({
        icon: 'warning',
        title: 'Email Required',
        text: 'Please enter your email address'
      });
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (data.success) {
        await Swal.fire({
          icon: 'success',
          title: 'Subscribed Successfully! 🎉',
          text: data.message,
          confirmButtonColor: '#F59E0B'
        });
        setEmail('');
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Subscription Failed',
        text: error.message || 'Please try again later',
        confirmButtonColor: '#F59E0B'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Rajkumar Catering Services</h3>
          <p className="text-sm leading-relaxed mb-4">
            Delivering premium catering services for weddings, corporate events,
            and private parties. Taste meets elegance.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="#" className="p-2 bg-gray-700 hover:bg-amber-600 rounded-full">
              <FaFacebook />
            </a>
            <a href="#" className="p-2 bg-gray-700 hover:bg-amber-600 rounded-full">
              <FaInstagram />
            </a>
            <a href="#" className="p-2 bg-gray-700 hover:bg-amber-600 rounded-full">
              <FaTwitter />
            </a>
            <a href="#" className="p-2 bg-gray-700 hover:bg-amber-600 rounded-full">
              <FaLinkedin />
            </a>
            <a href="https://wa.me/919918309983" target="_blank" rel="noreferrer" className="p-2 bg-gray-700 hover:bg-green-600 rounded-full">
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-amber-600 inline-block">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#home" className="hover:text-amber-500">Home</a></li>
            <li><a href="#about" className="hover:text-amber-500">About</a></li>
            <li><a href="#services" className="hover:text-amber-500">Services</a></li>
            <li><a href="#menu" className="hover:text-amber-500">Menu</a></li>
            <li><a href="#gallery" className="hover:text-amber-500">Gallery</a></li>
            <li><a href="#contact" className="hover:text-amber-500">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-amber-600 inline-block">
            Contact
          </h3>
          <ul className="space-y-3 text-sm">
            <li>📍 Lucknow, India</li>
            <li>📞 +91 9918309983</li>
            <li>📧 anilkumarsingh43425@gmail.com</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-amber-600 inline-block">
            Newsletter
          </h3>
          <p className="text-sm mb-6">
            Subscribe & never miss our latest offers and event updates.
          </p>

          <form onSubmit={handleSubscribe} className="relative w-full max-w-sm">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 pr-28 rounded-full bg-gray-800/60 backdrop-blur-md 
                         border border-gray-700 text-gray-200 placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
              required
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-1 top-1 bottom-1 px-5 rounded-full bg-amber-600 
                         hover:bg-amber-700 text-white font-medium shadow-md transition
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Subscribe'
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} CateringHub. All Rights Reserved.
      </div>
    </footer>
  );
}
