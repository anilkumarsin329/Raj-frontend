import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardForm, setCardForm] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    address: "",
    city: "",
    pinCode: ""
  });
  const [agreePayment, setAgreePayment] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Get booking data from localStorage
  const bookingAmount = localStorage.getItem('bookingAmount') || '0';
  const guestCount = localStorage.getItem('guestCount') || '50';
  const totalAmount = parseFloat(bookingAmount) || 14750; // Default for 50 guests
  const advanceAmount = Math.round(totalAmount * 0.3); // 30% advance
  const remainingAmount = totalAmount - advanceAmount;
  const baseAmount = parseInt(guestCount) * 250;
  const gstAmount = baseAmount * 0.18;
  
  console.log('Payment data:', { bookingAmount, guestCount, totalAmount, advanceAmount });

  const handleCardChange = (e) => {
    let { name, value } = e.target;
    
    if (name === "cardNumber") {
      value = value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
      value = value.match(/.{1,4}/g)?.join(' ') || value;
    } else if (name === "expiryDate") {
      value = value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
      }
    } else if (name === "cvv") {
      value = value.replace(/[^0-9]/g, '');
    }
    
    setCardForm({ ...cardForm, [name]: value });
  };

  const validateCard = () => {
    const { cardNumber, expiryDate, cvv, cardholderName } = cardForm;
    
    if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Please fill in all required fields.'
      });
      return false;
    }

    if (!agreePayment) {
      Swal.fire({
        icon: 'error',
        title: 'Terms Required',
        text: 'Please agree to the payment terms to proceed.'
      });
      return false;
    }

    const cleanCardNumber = cardNumber.replace(/\s/g, '');
    if (cleanCardNumber.length < 13 || cleanCardNumber.length > 19) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Card',
        text: 'Please enter a valid card number.'
      });
      return false;
    }

    if (cvv.length < 3 || cvv.length > 4) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid CVV',
        text: 'Please enter a valid CVV.'
      });
      return false;
    }

    return true;
  };

  const processPayment = async () => {
    if (paymentMethod === "card" && !validateCard()) return;
    
    setLoading(true);
    
    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
      const bookingId = localStorage.getItem('currentBookingId');
      
      if (!bookingId) {
        const result = await Swal.fire({
          icon: 'warning',
          title: 'No Booking Found',
          text: 'Please complete the booking form first.',
          confirmButtonText: 'Go to Booking',
          showCancelButton: true,
          cancelButtonText: 'Continue Anyway'
        });
        
        if (result.isConfirmed) {
          navigate('/booking');
          return;
        }
        // If user chooses to continue anyway, use a dummy booking ID
      }
      
      const paymentData = {
        bookingId: bookingId || `temp_${Date.now()}`,
        amount: advanceAmount,
        paymentMethod,
        cardLast4: paymentMethod === 'card' ? cardForm.cardNumber.slice(-4) : undefined,
        cardType: paymentMethod === 'card' ? 'visa' : undefined,
        upiId: paymentMethod === 'upi' ? 'user@upi' : undefined
      };
      
      console.log('Payment data being sent:', paymentData);
      
      const response = await fetch(`${API_URL}/api/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Clear booking ID from storage
        localStorage.removeItem('currentBookingId');
        
        const paymentInfo = data.data?.payment || data.payment || data;
        
        await Swal.fire({
          icon: 'success',
          title: 'Payment Successful! 🎉',
          html: `
            <div class="text-left">
              <p><strong>Transaction ID:</strong> ${paymentInfo.transactionId || 'N/A'}</p>
              <p><strong>Amount Paid:</strong> ₹${(paymentInfo.amount || advanceAmount).toLocaleString()}</p>
              <p><strong>Payment Method:</strong> ${paymentMethod === 'card' ? 'Credit/Debit Card' : 'UPI'}</p>
              <p><strong>Remaining Amount:</strong> ₹${remainingAmount.toLocaleString()} (to be paid on event day)</p>
              <br>
              <p>Your booking has been confirmed. You will receive a confirmation email shortly.</p>
              <p>Thank you for choosing Rajkumar Catering Services!</p>
            </div>
          `,
          confirmButtonText: 'Continue',
          confirmButtonColor: '#DC2626'
        });
        
        navigate("/");
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Payment Failed',
          text: data.message || 'Something went wrong. Please try again.'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'Please check your connection and try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const processUPIPayment = async () => {
    await Swal.fire({
      icon: 'info',
      title: 'Redirecting to UPI App',
      html: `
        <div class="text-left">
          <p><strong>Amount:</strong> ₹${advanceAmount.toLocaleString()}</p>
          <p><strong>Merchant:</strong> Rajkumar Catering Services</p>
          <br>
          <p>Please complete the payment in your UPI app.</p>
        </div>
      `,
      timer: 2000,
      showConfirmButton: false
    });
    
    processPayment();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Secure Payment</h1>
          <p className="text-lg max-w-2xl mx-auto">Complete your booking with our secure payment gateway</p>
        </div>
      </section>

      {/* Payment Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Order Summary */}
              <div>
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-red-600 mb-6">Order Summary</h2>
                  
                  {/* Event Details */}
                  <div className="border-b pb-6 mb-6">
                    <h3 className="font-semibold text-lg mb-4">Event Details</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Event Type:</span>
                        <span className="font-medium">Catering Service</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Guest Count:</span>
                        <span className="font-medium">{guestCount} People</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rate per Guest:</span>
                        <span className="font-medium">₹250</span>
                      </div>
                    </div>
                  </div>

                  {/* Package Details */}
                  <div className="border-b pb-6 mb-6">
                    <h3 className="font-semibold text-lg mb-4">Package Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Catering Package</span>
                        <span className="font-medium">₹250 × {guestCount}</span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>• Fresh & Quality Food</div>
                        <div>• Professional Service</div>
                        <div>• Complete Setup</div>
                        <div>• Hygiene Standards</div>
                      </div>
                    </div>
                  </div>



                  {/* Price Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Base Amount ({guestCount} × ₹250)</span>
                      <span className="font-medium">₹{baseAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST (18%)</span>
                      <span className="font-medium">₹{Math.round(gstAmount).toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total Amount</span>
                        <span className="text-red-600">₹{totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Advance Payment */}
                  <div className="mt-6 p-4 bg-yellow-100 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">Advance Payment (30%)</h4>
                        <p className="text-sm text-gray-600">Remaining ₹{remainingAmount.toLocaleString()} on event day</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-red-600">₹{advanceAmount.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Pay Now</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <div>
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-red-600 mb-6">Payment Details</h2>
                  
                  {/* Payment Methods */}
                  <div className="mb-8">
                    <h3 className="font-semibold text-lg mb-4">Select Payment Method</h3>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <label className="cursor-pointer">
                        <input 
                          type="radio" 
                          name="paymentMethod" 
                          value="card" 
                          checked={paymentMethod === "card"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="sr-only"
                        />
                        <div className={`border-2 rounded-lg p-4 text-center transition-colors ${
                          paymentMethod === "card" ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 hover:border-yellow-400'
                        }`}>
                          <i className="fas fa-credit-card text-2xl text-yellow-500 mb-2"></i>
                          <div className="font-semibold">Credit/Debit Card</div>
                        </div>
                      </label>
                      <label className="cursor-pointer">
                        <input 
                          type="radio" 
                          name="paymentMethod" 
                          value="upi" 
                          checked={paymentMethod === "upi"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="sr-only"
                        />
                        <div className={`border-2 rounded-lg p-4 text-center transition-colors ${
                          paymentMethod === "upi" ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 hover:border-yellow-400'
                        }`}>
                          <i className="fas fa-mobile-alt text-2xl text-yellow-500 mb-2"></i>
                          <div className="font-semibold">UPI Payment</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Card Payment Form */}
                  {paymentMethod === "card" && (
                    <div>
                      <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">Card Number *</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            name="cardNumber"
                            value={cardForm.cardNumber}
                            onChange={handleCardChange}
                            placeholder="1234 5678 9012 3456" 
                            maxLength="19" 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent pr-12"
                          />
                          <div className="absolute right-3 top-3 flex space-x-1">
                            <i className="fab fa-cc-visa text-blue-600"></i>
                            <i className="fab fa-cc-mastercard text-red-600"></i>
                            <i className="fab fa-cc-amex text-blue-500"></i>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-gray-700 font-semibold mb-2">Expiry Date *</label>
                          <input 
                            type="text" 
                            name="expiryDate"
                            value={cardForm.expiryDate}
                            onChange={handleCardChange}
                            placeholder="MM/YY" 
                            maxLength="5" 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 font-semibold mb-2">CVV *</label>
                          <input 
                            type="text" 
                            name="cvv"
                            value={cardForm.cvv}
                            onChange={handleCardChange}
                            placeholder="123" 
                            maxLength="4" 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">Cardholder Name *</label>
                        <input 
                          type="text" 
                          name="cardholderName"
                          value={cardForm.cardholderName}
                          onChange={handleCardChange}
                          placeholder="John Doe" 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}

                  {/* UPI Payment Form */}
                  {paymentMethod === "upi" && (
                    <div className="text-center mb-8">
                      <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-lg flex items-center justify-center">
                        <i className="fas fa-qrcode text-4xl text-gray-400"></i>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">Scan QR Code</h3>
                      <p className="text-gray-600 mb-4">Scan this QR code with any UPI app</p>
                      
                      <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">Or Enter UPI ID</label>
                        <input 
                          type="text" 
                          placeholder="yourname@upi" 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}

                  {/* Security Features */}
                  <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-shield-alt text-green-600 mr-2"></i>
                      <span className="font-semibold text-green-800">Secure Payment</span>
                    </div>
                    <p className="text-sm text-green-700">Your payment information is encrypted and secure. We use industry-standard SSL encryption.</p>
                  </div>

                  {/* Terms */}
                  <div className="mb-6">
                    <label className="flex items-start">
                      <input 
                        type="checkbox" 
                        checked={agreePayment}
                        onChange={(e) => setAgreePayment(e.target.checked)}
                        required 
                        className="mr-3 mt-1 text-yellow-400 focus:ring-yellow-400"
                      />
                      <span className="text-sm text-gray-600">
                        I agree to the <a href="#" className="text-red-600 hover:underline">Payment Terms</a> and understand that this advance payment secures my booking. The remaining amount will be collected on the event day.
                      </span>
                    </label>
                  </div>

                  {/* Payment Button */}
                  <button 
                    onClick={paymentMethod === "card" ? processPayment : processUPIPayment}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing Payment...
                      </div>
                    ) : (
                      <>
                        <i className="fas fa-lock mr-2"></i>
                        Pay ₹{advanceAmount.toLocaleString()} Securely
                      </>
                    )}
                  </button>

                  <div className="text-center text-sm text-gray-500">
                    <p>Powered by Razorpay • 256-bit SSL Encrypted</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}