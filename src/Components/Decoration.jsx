import React from 'react';
import { Link } from 'react-router-dom';
import { FaPalette, FaUsers, FaClock, FaCheckCircle } from 'react-icons/fa';

const Decoration = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white text-4xl shadow-lg">
            <FaPalette />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Event Decoration</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Transform your venue with stunning decorations and themes</p>
        </div>

        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600" 
                alt="Event Decoration"
                className="w-full h-96 lg:h-full object-cover"
              />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="mb-6">
                <div className="text-3xl font-bold text-amber-600 mb-2">₹5000-25000</div>
                <div className="text-gray-600 space-y-1">
                  <p><FaUsers className="inline mr-2" />All event sizes</p>
                  <p><FaClock className="inline mr-2" />Setup: 2-4 hours</p>
                </div>
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">What's Included:</h3>
                <ul className="space-y-3">
                  {["Floral Arrangements", "Theme Setup", "Lighting Design", "Backdrop Creation"].map((point, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <FaCheckCircle className="text-green-500" />
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-4">
                <Link to="/booking" className="flex-1 text-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                  Book Now
                </Link>
                <Link to="/contact" className="px-6 py-3 border-2 border-purple-600 text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transition-colors">
                  Get Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Decoration;