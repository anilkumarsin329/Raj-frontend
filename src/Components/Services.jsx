import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaUtensils,
  FaBriefcase,
  FaGlassMartiniAlt,
  FaUsers,
  FaBirthdayCake,
  FaMusic,
  FaRing,
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle
} from "react-icons/fa";
import Swal from "sweetalert2";

export default function Services() {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  // Handle anchor links
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    const serviceMap = {
      'wedding': 1, 'corporate': 2, 'private': 3, 'live': 4,
      'decoration': 'addon', 'staffing': 'addon', 'rental': 'addon'
    };
    if (hash && serviceMap[hash]) {
      if (typeof serviceMap[hash] === 'number') {
        const service = services.find(s => s.id === serviceMap[hash]);
        if (service) {
          document.getElementById(`service-${service.id}`)?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, []);

  const services = [
    {
      id: 1,
      icon: <FaRing />,
      title: "Weddings",
      category: "premium",
      desc: "Make your big day unforgettable with grand catering & decor.",
      points: ["Custom Menus", "Live Counters", "Luxury Presentation", "Bridal Suite Setup"],
      priceRange: "₹800-1500/person",
      minGuests: 100,
      duration: "6-8 hours",
      popular: true
    },
    {
      id: 2,
      icon: <FaBriefcase />,
      title: "Corporate Events",
      category: "business",
      desc: "Professional catering designed for offices, conferences & seminars.",
      points: ["Buffet Setup", "Coffee & Snacks", "On-time Service", "Professional Staff"],
      priceRange: "₹300-600/person",
      minGuests: 25,
      duration: "2-4 hours",
      popular: false
    },
    {
      id: 3,
      icon: <FaBirthdayCake />,
      title: "Birthdays & Anniversaries",
      category: "celebration",
      desc: "Celebrate special occasions with delicious food & décor.",
      points: ["Theme-based Setup", "Designer Cakes", "Entertainment Options", "Photo Booth"],
      priceRange: "₹400-800/person",
      minGuests: 25,
      duration: "3-5 hours",
      popular: true
    },
    {
      id: 4,
      icon: <FaGlassMartiniAlt />,
      title: "Beverages & Bars",
      category: "addon",
      desc: "Refreshing cocktails, mocktails, and full bar setup.",
      points: ["Cocktails/Mocktails", "Juice Counters", "Coffee Stations", "Bartender Service"],
      priceRange: "₹150-300/person",
      minGuests: 50,
      duration: "4-6 hours",
      popular: false
    },
    {
      id: 5,
      icon: <FaUtensils />,
      title: "Social Gatherings",
      category: "basic",
      desc: "From kitty parties to small family functions, we serve with care.",
      points: ["Mini Buffet", "Quick Service", "Budget-friendly Packages", "Home Delivery"],
      priceRange: "₹200-400/person",
      minGuests: 15,
      duration: "2-3 hours",
      popular: false
    },
    {
      id: 6,
      icon: <FaMusic />,
      title: "Special Celebrations",
      category: "premium",
      desc: "Festivals, engagements & cultural programs handled gracefully.",
      points: ["Stage Setup", "Food & Music Combo", "Premium Experience", "Cultural Themes"],
      priceRange: "₹600-1200/person",
      minGuests: 75,
      duration: "4-6 hours",
      popular: true
    },
  ];

  const categories = [
    { id: 'all', name: 'All Services', count: services.length },
    { id: 'premium', name: 'Premium', count: services.filter(s => s.category === 'premium').length },
    { id: 'business', name: 'Business', count: services.filter(s => s.category === 'business').length },
    { id: 'celebration', name: 'Celebrations', count: services.filter(s => s.category === 'celebration').length }
  ];

  const filteredServices = activeTab === 'all' ? services : services.filter(s => s.category === activeTab);

  const handleQuoteRequest = (service) => {
    setSelectedService(service);
    setShowQuoteModal(true);
  };

  const submitQuoteRequest = async (formData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Swal.fire({
        icon: 'success',
        title: 'Quote Request Sent!',
        text: 'We will contact you within 2 hours with a detailed quote.',
        confirmButtonColor: '#D97706'
      });
      
      setShowQuoteModal(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to send quote request. Please try again.',
        confirmButtonColor: '#DC2626'
      });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-200 to-gray-200" id="services">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Our <span className="text-amber-600">Services</span>
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-16 text-lg">
          From weddings to corporate events, birthdays to festivals,{" "}
          <span className="font-semibold text-amber-600">Rajkumar Catering Services</span>  
          brings taste, style, and perfection to every celebration.
        </p>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeTab === category.id
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-amber-100 shadow'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredServices.map((service, idx) => (
            <div
              key={service.id}
              id={`service-${service.id}`}
              className="bg-white shadow-lg p-8 rounded-2xl hover:shadow-2xl transition-all transform hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  🔥 Popular
                </div>
              )}

              {/* Icon */}
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-4xl shadow-lg transform transition-transform hover:scale-110 hover:rotate-6">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {service.title}
              </h3>

              {/* Price Range */}
              <div className="text-center mb-4">
                <span className="text-2xl font-bold text-amber-600">{service.priceRange}</span>
                <div className="text-sm text-gray-500 mt-1">
                  <FaUsers className="inline mr-1" /> Min {service.minGuests} guests
                  <FaClock className="inline ml-3 mr-1" /> {service.duration}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-4">{service.desc}</p>

              {/* Features */}
              <ul className="text-gray-700 text-sm space-y-2 mb-6">
                {service.points.map((point, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500 text-xs" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {/* Buttons */}
              <div className="flex gap-2">
                <Link 
                  to="/booking" 
                  className="flex-1 text-center px-4 py-2 bg-amber-600 text-white rounded-lg shadow hover:bg-amber-700 transition"
                >
                  Book Now
                </Link>
                <button 
                  onClick={() => handleQuoteRequest(service)}
                  className="px-4 py-2 border border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition"
                >
                  Quote
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 🔥 Stats Section */}
        <div className="mt-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
          <div>
            <h3 className="text-3xl font-bold text-amber-600">500+</h3>
            <p className="text-gray-600">Weddings Served</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-amber-600">300+</h3>
            <p className="text-gray-600">Corporate Events</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-amber-600">200+</h3>
            <p className="text-gray-600">Birthdays & Parties</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-amber-600">50+</h3>
            <p className="text-gray-600">Professional Chefs</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-amber-600">15+</h3>
            <p className="text-gray-600">Years Experience</p>
          </div>
        </div>

        {/* 🔥 CTA Banner */}
        <div className="mt-20 bg-amber-600 text-white py-10 px-6 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold mb-3">Plan Your Next Event With Us 🎉</h3>
          <p className="mb-6">Delicious food, premium service, and unforgettable memories.</p>
          <button className="px-6 py-3 bg-white text-amber-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition">
            Get a Free Quote
          </button>
        </div>

        {/* 🔥 Testimonials */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-gray-800 mb-8">What Our Clients Say</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
              <div className="flex justify-center mb-3 text-amber-500">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-600 italic mb-4">
                "Rajkumar Catering made our wedding magical! The food and service were world-class."
              </p>
              <h4 className="font-semibold text-amber-600">— Riya Sharma</h4>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
              <div className="flex justify-center mb-3 text-amber-500">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-600 italic mb-4">
                "Professional service for our corporate event. Everything was on point!"
              </p>
              <h4 className="font-semibold text-amber-600">— Arjun Mehta</h4>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
              <div className="flex justify-center mb-3 text-amber-500">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-600 italic mb-4">
                "Best catering experience ever. Guests loved the food & decor."
              </p>
              <h4 className="font-semibold text-amber-600">— Neha Verma</h4>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-20 bg-gradient-to-r from-amber-600 to-orange-600 text-white py-16 px-6 rounded-2xl">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">📞 Ready to Plan Your Event?</h3>
            <p className="text-xl mb-8">Get in touch with our expert team for personalized service</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur">
              <FaPhone className="text-3xl mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Call Us</h4>
              <p>+91 9918309983</p>
              <p className="text-sm opacity-80">Mon-Sun: 9 AM - 9 PM</p>
            </div>
            
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur">
              <FaWhatsapp className="text-3xl mx-auto mb-4" />
              <h4 className="font-semibold mb-2">WhatsApp</h4>
              <a href="https://wa.me/919876543210" className="hover:underline">
                Chat with us instantly
              </a>
              <p className="text-sm opacity-80">Quick responses</p>
            </div>
            
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur">
              <FaEnvelope className="text-3xl mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Email Us</h4>
              <p>info@cateringhub.com</p>
              <p className="text-sm opacity-80">24/7 support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Request Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Get Quote</h3>
              <button 
                onClick={() => setShowQuoteModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            {selectedService && (
              <div className="mb-6 p-4 bg-amber-50 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-2xl text-amber-600">{selectedService.icon}</div>
                  <div>
                    <h4 className="font-semibold">{selectedService.title}</h4>
                    <p className="text-sm text-gray-600">{selectedService.priceRange}</p>
                  </div>
                </div>
              </div>
            )}
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              submitQuoteRequest(formData);
            }}>
              <div className="space-y-4">
                <input
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                />
                <input
                  name="eventDate"
                  type="date"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                />
                <input
                  name="guestCount"
                  type="number"
                  placeholder="Number of Guests"
                  min={selectedService?.minGuests || 25}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                />
                <textarea
                  name="requirements"
                  placeholder="Special Requirements (Optional)"
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                ></textarea>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowQuoteModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                >
                  Send Quote Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/919876543210" 
        className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-lg hover:bg-green-600 transition text-white text-2xl z-50"
        target="_blank" 
        rel="noopener noreferrer"
      >
        💬
      </a>
    </section>
  );
}
