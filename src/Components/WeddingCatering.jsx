import React from 'react';
import { Link } from 'react-router-dom';
import { FaRing, FaUsers, FaClock, FaCheckCircle } from 'react-icons/fa';

const WeddingCatering = () => {
  const weddingService = {
    id: 1,
    title: "Wedding Catering",
    desc: "Make your big day unforgettable with grand catering & decor.",
    points: ["Custom Menus", "Live Counters", "Luxury Presentation", "Bridal Suite Setup"],
    priceRange: "₹800-1500/person",
    minGuests: 100,
    duration: "6-8 hours",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600"
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-4xl shadow-lg">
            <FaRing />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{weddingService.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{weddingService.desc}</p>
        </div>

        {/* Main Content */}
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Image */}
            <div className="relative">
              <img 
                src={weddingService.image} 
                alt={weddingService.title}
                className="w-full h-96 lg:h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                🔥 Most Popular
              </div>
            </div>

            {/* Details */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              
              {/* Price & Info */}
              <div className="mb-6">
                <div className="text-3xl font-bold text-amber-600 mb-2">{weddingService.priceRange}</div>
                <div className="text-gray-600 space-y-1">
                  <p><FaUsers className="inline mr-2" />Minimum {weddingService.minGuests} guests</p>
                  <p><FaClock className="inline mr-2" />Duration: {weddingService.duration}</p>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">What's Included:</h3>
                <ul className="space-y-3">
                  {weddingService.points.map((point, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <FaCheckCircle className="text-green-500" />
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Link 
                  to="/booking" 
                  className="flex-1 text-center px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  Book Now
                </Link>
                <Link 
                  to="/contact" 
                  className="px-6 py-3 border-2 border-amber-600 text-amber-600 font-semibold rounded-xl hover:bg-amber-50 transition-colors"
                >
                  Get Quote
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="text-5xl mb-4">🍽️</div>
            <h3 className="text-xl font-bold mb-3">Multi-Cuisine Menu</h3>
            <p className="text-gray-600">Indian, Continental, Chinese & more cuisines to delight your guests</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="text-5xl mb-4">🎨</div>
            <h3 className="text-xl font-bold mb-3">Premium Decoration</h3>
            <p className="text-gray-600">Elegant floral arrangements and themed decorations for your venue</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="text-5xl mb-4">👨🍳</div>
            <h3 className="text-xl font-bold mb-3">Expert Chefs</h3>
            <p className="text-gray-600">Professional culinary team with years of wedding catering experience</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-12 px-8 rounded-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Plan Your Dream Wedding? 💕</h2>
          <p className="text-xl mb-8 opacity-90">Let us make your special day absolutely perfect with our premium catering services</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/booking" 
              className="px-8 py-4 bg-white text-amber-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              📞 Book Consultation
            </Link>
            <a 
              href="https://wa.me/919918309983" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-green-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingCatering;