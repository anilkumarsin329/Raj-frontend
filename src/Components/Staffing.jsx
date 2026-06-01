import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserTie, FaUsers, FaClock, FaCheckCircle } from 'react-icons/fa';

const Staffing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white text-4xl shadow-lg">
            <FaUserTie />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Professional Staffing</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Experienced staff for seamless event service</p>
        </div>

        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600" 
                alt="Professional Staffing"
                className="w-full h-96 lg:h-full object-cover"
              />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="mb-6">
                <div className="text-3xl font-bold text-amber-600 mb-2">₹500-1500/person</div>
                <div className="text-gray-600 space-y-1">
                  <p><FaUsers className="inline mr-2" />Per staff member</p>
                  <p><FaClock className="inline mr-2" />Full event duration</p>
                </div>
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">What's Included:</h3>
                <ul className="space-y-3">
                  {["Trained Waiters", "Kitchen Staff", "Event Coordinators", "Cleanup Crew"].map((point, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <FaCheckCircle className="text-green-500" />
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-4">
                <Link to="/booking" className="flex-1 text-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                  Book Now
                </Link>
                <Link to="/contact" className="px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors">
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

export default Staffing;