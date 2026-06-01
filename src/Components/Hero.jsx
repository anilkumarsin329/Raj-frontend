import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const images = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1521305916504-4a1121188589?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1600&q=80"
];

function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden pt-20">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Rajkumar Catering Services ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
              index === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-amber-500/20 text-amber-300 rounded-full text-sm font-medium backdrop-blur-sm">
                🍽️ Premium Catering Services
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Creating <span className="text-amber-400">Unforgettable</span>
              <br />Culinary Experiences
            </h1>

            <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto lg:mx-0">
              From intimate gatherings to grand celebrations, we bring exceptional taste and flawless service to every event.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link
                to="/booking"
                className="px-8 py-4 bg-amber-500 text-white font-semibold rounded-lg shadow-lg hover:bg-amber-600 transform hover:scale-105 transition-all duration-300"
              >
                Book Your Event
              </Link>
              <Link
                to="/services"
                className="px-8 py-4 bg-white/10 text-white font-semibold rounded-lg backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                View Services
              </Link>
            </div>


          </div>

          {/* Right Content - Stats */}
          <div className="grid grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl text-center border border-white/20">
              <h3 className="text-3xl lg:text-4xl font-bold text-amber-400 mb-2">1200+</h3>
              <p className="text-white font-medium">Events Catered</p>
              <p className="text-gray-300 text-sm mt-1">Successfully Completed</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl text-center border border-white/20">
              <h3 className="text-3xl lg:text-4xl font-bold text-amber-400 mb-2">15+</h3>
              <p className="text-white font-medium">Years Experience</p>
              <p className="text-gray-300 text-sm mt-1">In Food Industry</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl text-center border border-white/20">
              <h3 className="text-3xl lg:text-4xl font-bold text-amber-400 mb-2">2000+</h3>
              <p className="text-white font-medium">Happy Clients</p>
              <p className="text-gray-300 text-sm mt-1">Satisfied Customers</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl text-center border border-white/20">
              <h3 className="text-3xl lg:text-4xl font-bold text-amber-400 mb-2">4.9⭐</h3>
              <p className="text-white font-medium">Rating</p>
              <p className="text-gray-300 text-sm mt-1">Customer Reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Slideshow Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === current ? "bg-amber-500 w-8" : "bg-white/50 hover:bg-white/70"
            }`}
          ></button>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
