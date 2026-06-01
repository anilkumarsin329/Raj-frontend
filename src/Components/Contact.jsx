import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaClock, FaUsers, FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/api/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        await Swal.fire({
          icon: 'success',
          title: 'Message Sent Successfully! ✅',
          text: data.message,
          confirmButtonColor: '#F59E0B',
          timer: 4000
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        });
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      
      await Swal.fire({
        icon: 'error',
        title: 'Failed to Send Message ❌',
        text: error.message || 'Please try again or contact us directly.',
        confirmButtonColor: '#F59E0B'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Get in <span className="text-amber-600">Touch</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ready to make your event unforgettable? Contact our expert team for personalized catering solutions.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaPhoneAlt className="text-amber-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Call Us</h3>
            <p className="text-gray-600 mb-4">Speak directly with our team</p>
            <a 
              href="tel:+919918309983"
              className="text-amber-600 font-semibold hover:text-amber-700 transition-colors"
            >
              +91 9918309983
            </a>
            <p className="text-sm text-gray-500 mt-2">Mon-Sun: 9 AM - 9 PM</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaWhatsapp className="text-green-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">WhatsApp</h3>
            <p className="text-gray-600 mb-4">Quick chat support</p>
            <a 
              href="https://wa.me/919918309983"
              target="_blank"
              rel="noreferrer"
              className="text-green-600 font-semibold hover:text-green-700 transition-colors"
            >
              Chat Now
            </a>
            <p className="text-sm text-gray-500 mt-2">Instant responses</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaEnvelope className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Email Us</h3>
            <p className="text-gray-600 mb-4">Send detailed inquiries</p>
            <a 
              href="mailto:anilkumarsingh43425@gmail.com"
              className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              Send Email
            </a>
            <p className="text-sm text-gray-500 mt-2">24/7 support</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Send us a Message</h3>
              <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Subject *</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="wedding">Wedding Catering</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="birthday">Birthday Party</option>
                  <option value="quote">Get Quote</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your event requirements..."
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </div>
                ) : (
                  '📧 Send Message'
                )}
              </button>
            </form>
          </div>

          {/* Right: Map & Info */}
          <div className="space-y-8">
            {/* Map */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <iframe
                title="Rajkumar Catering Services Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.055578713462!2d80.94616631504472!3d26.84669338315815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd1e8d28b3b9%3A0xdeb95df2da233c6!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1670000000000!5m2!1sen!2sin"
                width="100%"
                height="300"
                allowFullScreen=""
                loading="lazy"
                className="w-full"
              ></iframe>
              
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FaMapMarkerAlt className="text-amber-600 text-xl" />
                  <div>
                    <h4 className="font-bold text-gray-800">Our Location</h4>
                    <p className="text-gray-600">Lucknow, Uttar Pradesh, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <FaClock className="text-amber-600 text-xl" />
                <h4 className="text-xl font-bold text-gray-800">Business Hours</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-semibold text-gray-800">9:00 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday - Sunday</span>
                  <span className="font-semibold text-gray-800">9:00 AM - 10:00 PM</span>
                </div>
                <div className="flex items-center gap-2 mt-4 p-3 bg-green-50 rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-700 font-medium">Currently Open</span>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
              <h4 className="text-xl font-bold text-gray-800 mb-4">Why Choose Rajkumar Catering?</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-500" />
                  <span className="text-gray-700">24/7 Customer Support</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-500" />
                  <span className="text-gray-700">Free Consultation & Quote</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-500" />
                  <span className="text-gray-700">Professional Team</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-500" />
                  <span className="text-gray-700">Customized Menu Options</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6 bg-amber-50 rounded-xl">
            <h3 className="text-3xl font-bold text-amber-600">24hrs</h3>
            <p className="text-gray-600 font-medium">Response Time</p>
          </div>
          <div className="p-6 bg-green-50 rounded-xl">
            <h3 className="text-3xl font-bold text-green-600">1200+</h3>
            <p className="text-gray-600 font-medium">Events Catered</p>
          </div>
          <div className="p-6 bg-blue-50 rounded-xl">
            <h3 className="text-3xl font-bold text-blue-600">4.9⭐</h3>
            <p className="text-gray-600 font-medium">Client Rating</p>
          </div>
          <div className="p-6 bg-purple-50 rounded-xl">
            <h3 className="text-3xl font-bold text-purple-600">100%</h3>
            <p className="text-gray-600 font-medium">Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
}