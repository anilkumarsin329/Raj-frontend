import React from 'react';
import { Link } from 'react-router-dom';
import { FaChair, FaUsers, FaClock, FaCheckCircle } from 'react-icons/fa';

const Rental = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white text-4xl shadow-lg">
            <FaChair />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Equipment Rental</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Complete furniture and equipment rental for your events</p>
        </div>

        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=600" 
                alt="Equipment Rental"
                className="w-full h-96 lg:h-full object-cover"
              />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="mb-6">
                <div className="text-3xl font-bold text-amber-600 mb-2">₹50-500/item</div>
                <div className="text-gray-600 space-y-1">
                  <p><FaUsers className="inline mr-2" />Per item rental</p>
                  <p><FaClock className="inline mr-2" />1-3 days rental</p>
                </div>
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">What's Available:</h3>
                <ul className="space-y-3">
                  {["Tables & Chairs", "Sound System", "Lighting Equipment", "Tents & Canopies"].map((point, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <FaCheckCircle className="text-green-500" />
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-4">
                <Link to="/booking" className="flex-1 text-center px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                  Book Now
                </Link>
                <Link to="/contact" className="px-6 py-3 border-2 border-orange-600 text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition-colors">
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

export default Rental;