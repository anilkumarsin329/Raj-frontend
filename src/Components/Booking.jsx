import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function Booking() {
  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    alternateContact: "",
    eventType: "",
    eventDate: "",
    eventTime: "",
    eventDuration: "",
    guestCount: "",
    budgetRange: "",
    venueAddress: "",
    venueType: "",
    kitchenFacilities: "",
    mealType: [],
    cuisine: [],
    additionalServices: [],
    dietary: [],
    specialRequirements: "",
    referralSource: "",
    contactMethod: "phone",
    agreeTerms: false
  });

  // Calculate total cost based on guest count
  const pricePerGuest = 250;
  const totalCost = form.guestCount ? parseInt(form.guestCount) * pricePerGuest : 0;
  const gst = totalCost * 0.18;
  const finalAmount = totalCost + gst;

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === "checkbox") {
      if (name === "agreeTerms") {
        setForm({ ...form, [name]: checked });
      } else {
        const currentArray = form[name] || [];
        if (checked) {
          setForm({ ...form, [name]: [...currentArray, value] });
        } else {
          setForm({ ...form, [name]: currentArray.filter(item => item !== value) });
        }
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!form.fullName || !form.phoneNumber || !form.emailAddress || !form.eventType || !form.eventDate || !form.guestCount) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Please fill in all required fields.'
      });
      return;
    }

    if (!form.agreeTerms) {
      Swal.fire({
        icon: 'error',
        title: 'Terms Required',
        text: 'Please agree to the Terms & Conditions to proceed.'
      });
      return;
    }

    if (form.mealType.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Meal Type Required',
        text: 'Please select at least one meal type.'
      });
      return;
    }

    if (parseInt(form.guestCount) < 25) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Guest Count',
        text: 'Minimum guest count is 25 people.'
      });
      return;
    }

    try {
      console.log('Submitting booking:', form);
      
      const response = await fetch(`${API_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
      
      const data = await response.json();
      console.log('Booking response:', data);
      
      if (response.ok) {
        const bookingId = data.data?.bookingId || data.bookingId || data.data?.booking?._id;
        
        await Swal.fire({
          icon: 'success',
          title: 'Booking Request Submitted!',
          html: `
            <div class="text-left">
              <p><strong>Booking ID:</strong> ${bookingId}</p>
              <p>Our team will contact you within 24 hours to confirm the details.</p>
            </div>
          `,
          confirmButtonText: 'Proceed to Payment',
          confirmButtonColor: '#DC2626'
        });
        
        localStorage.setItem('currentBookingId', bookingId);
        localStorage.setItem('bookingAmount', finalAmount.toString());
        localStorage.setItem('guestCount', form.guestCount);
        navigate("/payment");
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Booking Failed',
          text: data.message || 'Something went wrong'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'Please check your connection and try again.'
      });
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Book Your Event</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">Let us create an unforgettable culinary experience for your special occasion</p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold">1200+</div>
              <div className="text-sm opacity-80">Events Catered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">24hrs</div>
              <div className="text-sm opacity-80">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">4.9⭐</div>
              <div className="text-sm opacity-80">Client Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-8 text-center">
                <h2 className="text-3xl font-bold text-white mb-2">Event Booking Form</h2>
                <p className="text-white opacity-90">Fill in the details below and we'll get back to you within 24 hours</p>
                <div className="mt-4 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Our team is online and ready to help
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="p-8">
                {/* Personal Information */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                    <h3 className="text-2xl font-semibold text-gray-800">Personal Information</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
                      <input 
                        type="text" 
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        required 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
                      <input 
                        type="tel" 
                        name="phoneNumber"
                        value={form.phoneNumber}
                        onChange={handleChange}
                        required 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                      <input 
                        type="email" 
                        name="emailAddress"
                        value={form.emailAddress}
                        onChange={handleChange}
                        required 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Alternate Contact</label>
                      <input 
                        type="tel" 
                        name="alternateContact"
                        value={form.alternateContact}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Event Details */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                    <h3 className="text-2xl font-semibold text-gray-800">Event Details</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Event Type *</label>
                      <select 
                        name="eventType"
                        value={form.eventType}
                        onChange={handleChange}
                        required 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                      >
                        <option value="">Select Event Type</option>
                        <option value="wedding">Wedding</option>
                        <option value="engagement">Engagement</option>
                        <option value="birthday">Birthday Party</option>
                        <option value="anniversary">Anniversary</option>
                        <option value="corporate">Corporate Event</option>
                        <option value="conference">Conference</option>
                        <option value="festival">Festival Celebration</option>
                        <option value="custom">Custom Event</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Event Date *</label>
                      <input 
                        type="date" 
                        name="eventDate"
                        value={form.eventDate}
                        onChange={handleChange}
                        min={minDate}
                        required 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Event Time *</label>
                      <input 
                        type="time" 
                        name="eventTime"
                        value={form.eventTime}
                        onChange={handleChange}
                        required 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Duration (Hours) *</label>
                      <select 
                        name="eventDuration"
                        value={form.eventDuration}
                        onChange={handleChange}
                        required 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                      >
                        <option value="">Select Duration</option>
                        <option value="2">2 Hours</option>
                        <option value="3">3 Hours</option>
                        <option value="4">4 Hours</option>
                        <option value="5">5 Hours</option>
                        <option value="6">6 Hours</option>
                        <option value="8">8 Hours</option>
                        <option value="full-day">Full Day</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Guest Count *</label>
                      <input 
                        type="number" 
                        name="guestCount"
                        value={form.guestCount}
                        onChange={handleChange}
                        required 
                        min="25" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                      />
                      {form.guestCount && (
                        <div className="mt-2 p-3 bg-amber-50 rounded-lg border border-amber-200">
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                              <span>Base Cost ({form.guestCount} × ₹250):</span>
                              <span className="font-semibold">₹{totalCost.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>GST (18%):</span>
                              <span className="font-semibold">₹{gst.toLocaleString()}</span>
                            </div>
                            <div className="border-t border-amber-300 pt-1 flex justify-between font-bold text-amber-700">
                              <span>Total Amount:</span>
                              <span>₹{finalAmount.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Budget Range *</label>
                      <select 
                        name="budgetRange"
                        value={form.budgetRange}
                        onChange={handleChange}
                        required 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                      >
                        <option value="">Select Budget Range</option>
                        <option value="10000-25000">₹10,000 - ₹25,000</option>
                        <option value="25000-50000">₹25,000 - ₹50,000</option>
                        <option value="50000-100000">₹50,000 - ₹1,00,000</option>
                        <option value="100000-200000">₹1,00,000 - ₹2,00,000</option>
                        <option value="200000+">₹2,00,000+</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Venue Information */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                    <h3 className="text-2xl font-semibold text-gray-800">Venue Information</h3>
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Venue Address *</label>
                    <textarea 
                      name="venueAddress"
                      value={form.venueAddress}
                      onChange={handleChange}
                      required 
                      rows="3" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors" 
                      placeholder="Enter complete venue address with landmarks"
                    />
                  </div>
                </div>

                {/* Service Requirements */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                    <h3 className="text-2xl font-semibold text-gray-800">Service Requirements</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Meal Type *</label>
                      <div className="space-y-2">
                        {["breakfast", "lunch", "dinner", "snacks"].map(meal => (
                          <label key={meal} className="flex items-center">
                            <input 
                              type="checkbox" 
                              name="mealType" 
                              value={meal} 
                              checked={form.mealType.includes(meal)}
                              onChange={handleChange}
                              className="mr-2 text-amber-500 focus:ring-amber-500"
                            />
                            <span className="capitalize">{meal === "snacks" ? "Snacks & Appetizers" : meal}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Cuisine Preference</label>
                      <div className="space-y-2">
                        {["north-indian", "south-indian", "chinese", "continental"].map(cuisine => (
                          <label key={cuisine} className="flex items-center">
                            <input 
                              type="checkbox" 
                              name="cuisine" 
                              value={cuisine} 
                              checked={form.cuisine.includes(cuisine)}
                              onChange={handleChange}
                              className="mr-2 text-amber-500 focus:ring-amber-500"
                            />
                            <span>{cuisine.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold">5</div>
                    <h3 className="text-2xl font-semibold text-gray-800">Additional Information</h3>
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Special Requirements or Instructions</label>
                    <textarea 
                      name="specialRequirements"
                      value={form.specialRequirements}
                      onChange={handleChange}
                      rows="4" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors" 
                      placeholder="Please mention any specific requirements, allergies, theme preferences, or special instructions..."
                    />
                  </div>
                </div>

                {/* Terms and Submit */}
                <div className="border-t pt-8">
                  <div className="mb-6">
                    <label className="flex items-start">
                      <input 
                        type="checkbox" 
                        name="agreeTerms"
                        checked={form.agreeTerms}
                        onChange={handleChange}
                        required 
                        className="mr-3 mt-1 text-amber-500 focus:ring-amber-500"
                      />
                      <span className="text-sm text-gray-600">
                        I agree to the <a href="#" className="text-amber-600 hover:underline">Terms & Conditions</a> and 
                        <a href="#" className="text-amber-600 hover:underline"> Privacy Policy</a>. I understand that this is a booking request and final confirmation will be provided after discussion with the Rajkumar Catering team.
                      </span>
                    </label>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      type="submit" 
                      className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      📅 Submit Booking Request
                    </button>
                  </div>
                  <div className="text-center text-sm text-gray-500 mt-4">
                    <p>🔒 Your information is secure and will only be used for booking purposes</p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}