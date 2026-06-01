import React from "react";
import { Link } from "react-router-dom";
import { FaAward, FaUsers, FaCalendarCheck, FaUtensils, FaHeart, FaStar } from "react-icons/fa";

export default function About() {
  return (
    <section 
      id="about" 
      className="relative py-20 bg-fixed bg-center bg-cover"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80')"
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="text-amber-400">Rajkumar Catering</span>
          </h2>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto">
            Creating unforgettable culinary experiences for over a decade with passion, precision, and perfection.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Our Story</h3>
            <p className="text-gray-200 mb-4 leading-relaxed">
              Founded in 2012, Rajkumar Catering Services has been the trusted partner for thousands of memorable events. 
              We started with a simple vision: to bring restaurant-quality food and five-star service to every celebration.
            </p>
            <p className="text-gray-200 mb-6 leading-relaxed">
              Today, we're proud to be one of the leading catering services, known for our innovative menus, 
              professional staff, and attention to detail that makes every event extraordinary.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <FaAward className="text-amber-400 text-xl" />
                <span className="text-white font-medium">Award Winning</span>
              </div>
              <div className="flex items-center gap-3">
                <FaUtensils className="text-amber-400 text-xl" />
                <span className="text-white font-medium">Expert Chefs</span>
              </div>
              <div className="flex items-center gap-3">
                <FaHeart className="text-amber-400 text-xl" />
                <span className="text-white font-medium">Made with Love</span>
              </div>
              <div className="flex items-center gap-3">
                <FaStar className="text-amber-400 text-xl" />
                <span className="text-white font-medium">5-Star Service</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
            <h4 className="text-xl font-bold text-white mb-4">Why Choose Us?</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-amber-400 font-bold">✓</span>
                <span className="text-gray-200">Fresh ingredients sourced daily from local suppliers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400 font-bold">✓</span>
                <span className="text-gray-200">Customizable menus for all dietary preferences</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400 font-bold">✓</span>
                <span className="text-gray-200">Professional setup and cleanup service</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400 font-bold">✓</span>
                <span className="text-gray-200">24/7 customer support and event coordination</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400 font-bold">✓</span>
                <span className="text-gray-200">Competitive pricing with no hidden charges</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/20 transition">
            <FaCalendarCheck className="text-4xl text-amber-400 mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-white">15+</h3>
            <p className="text-gray-200">Years Experience</p>
          </div>
          <div className="text-center p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/20 transition">
            <FaUsers className="text-4xl text-amber-400 mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-white">2000+</h3>
            <p className="text-gray-200">Happy Clients</p>
          </div>
          <div className="text-center p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/20 transition">
            <FaUtensils className="text-4xl text-amber-400 mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-white">1200+</h3>
            <p className="text-gray-200">Events Catered</p>
          </div>
          <div className="text-center p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/20 transition">
            <FaStar className="text-4xl text-amber-400 mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-white">4.9★</h3>
            <p className="text-gray-200">Average Rating</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-amber-600 to-orange-600 text-white py-12 px-8 rounded-2xl">
          <h3 className="text-2xl font-bold mb-4">Ready to Create Magic Together? ✨</h3>
          <p className="text-lg mb-6 opacity-90">
            Let us handle the food while you enjoy your special moments
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/services" 
              className="px-8 py-3 bg-white text-amber-600 font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              View Our Services
            </Link>
            <Link 
              to="/booking" 
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-amber-600 transition"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
