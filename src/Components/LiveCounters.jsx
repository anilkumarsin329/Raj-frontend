import React from 'react';
import { Link } from 'react-router-dom';
import { FaUtensils, FaUsers, FaClock, FaCheckCircle } from 'react-icons/fa';

const LiveCounters = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-teal-600 text-white text-4xl shadow-lg">
            <FaUtensils />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Live Counters</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Interactive cooking stations for fresh, hot food prepared live</p>
        </div>

        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600" 
                alt="Live Counters"
                className="w-full h-96 lg:h-full object-cover"
              />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="mb-6">
                <div className="text-3xl font-bold text-amber-600 mb-2">₹200-500/person</div>
                <div className="text-gray-600 space-y-1">
                  <p><FaUsers className="inline mr-2" />Minimum 50 guests</p>
                  <p><FaClock className="inline mr-2" />Duration: 4-6 hours</p>
                </div>
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">What's Included:</h3>
                <ul className="space-y-3">
                  {["Chaat Counter", "Pasta Station", "Grill Counter", "Dessert Bar"].map((point, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <FaCheckCircle className="text-green-500" />
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-4">
                <Link to="/booking" className="flex-1 text-center px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                  Book Now
                </Link>
                <Link to="/contact" className="px-6 py-3 border-2 border-green-600 text-green-600 font-semibold rounded-xl hover:bg-green-50 transition-colors">
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

export default LiveCounters;