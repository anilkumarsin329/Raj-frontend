import React, { useState, useEffect } from 'react';
import { FaUtensils, FaDrumstickBite, FaCookie, FaCoffee, FaGift, FaStar, FaCrown, FaTimes } from 'react-icons/fa';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('starters');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Handle anchor links
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && ['starters', 'main', 'desserts', 'beverages'].includes(hash)) {
      setActiveCategory(hash);
    }
  }, []);

  const menuCategories = {
    starters: [
      { name: "Paneer Tikka", price: "₹180", description: "Grilled cottage cheese with spices", image: "/Paneer-Tikka.jpg" },
      { name: "Spring Rolls", price: "₹120", description: "Crispy vegetable rolls", image: "/Spring roll.jpeg" },
      { name: "Samosa", price: "₹60", description: "Crispy fried pastry with filling", image: "/Samosa.jpg" },
      { name: "Manchurian", price: "₹140", description: "Indo-Chinese fried balls", image: "/Manchurian.jpeg" },
      { name: "French Fries", price: "₹100", description: "Crispy golden potato fries", image: "/French.jpeg" },
      { name: "Hot Dog", price: "₹80", description: "Classic hot dog with sausage", image: "/Hot Dog.webp" },
      { name: "Chicken Wings", price: "₹200", description: "Spicy grilled chicken wings", image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=300" },
      { name: "Fish Fingers", price: "₹180", description: "Crispy fried fish strips", image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=300" },
      { name: "Chicken Lollipop", price: "₹220", description: "Drumstick shaped chicken starter", image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=300" },
      { name: "Veg Cutlet", price: "₹90", description: "Mixed vegetable patties", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300" },
      { name: "Chicken Seekh Kebab", price: "₹240", description: "Minced chicken on skewers", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300" },
      { name: "Aloo Tikki", price: "₹70", description: "Spiced potato patties", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300" }
    ],
    main: [
      { name: "Chicken Butter Masala", price: "₹280", description: "Creamy tomato-based chicken curry", image: "/Chicken Butter Masala.webp" },
      { name: "Royal Biryani", price: "₹320", description: "Aromatic basmati rice with spices", image: "/Royal Biryani.jpg" },
      { name: "Dal Makhani", price: "₹180", description: "Rich black lentils in cream", image: "/Dal Makhani.jpg" },
      { name: "Paneer Butter Masala", price: "₹200", description: "Cottage cheese in rich gravy", image: "/Paneer Butter Masala.jpg" },
      { name: "Kadai Paneer", price: "₹190", description: "Spicy paneer with bell peppers", image: "/Kadai Paneer.jpg" },
      { name: "Shahi Paneer", price: "₹220", description: "Royal paneer in creamy sauce", image: "/Shahi Paneer.webp" },
      { name: "Mutton Rogan Josh", price: "₹350", description: "Kashmiri mutton curry", image: "/Mutton Rogan Josh.jpg" },
      { name: "Chicken Tandoori", price: "₹250", description: "Clay oven roasted chicken", image: "/Chicken Tan.jpg" },
      { name: "Veg Biryani", price: "₹200", description: "Vegetarian aromatic rice", image: "/Veg Biryani.jpeg" },
      { name: "Chicken Fried Rice", price: "₹180", description: "Wok-tossed rice with chicken", image: "/Chicken Fried Rice.jpg" },
      { name: "Veg Fried Rice", price: "₹150", description: "Stir-fried rice with vegetables", image: "/VegFriedRice.jpg" },
      { name: "Chicken Noodles", price: "₹170", description: "Stir-fried noodles with chicken", image: "/Chicken Noodles.jpg" },
      { name: "Veg Hakka Noodles", price: "₹140", description: "Indo-Chinese vegetable noodles", image: "/Veg Hakka Noodles.jpg" },
      { name: "Chole Bhature", price: "₹160", description: "Spicy chickpeas with fried bread", image: "/Chole Bhature.jpg" },
      { name: "Pav Bhaji", price: "₹140", description: "Spiced vegetable curry with bread", image: "/Pav Bhaji.jpeg" },
      { name: "Masala Dosa", price: "₹120", description: "South Indian crepe with filling", image: "/Masala Dosa.jpeg" },
      { name: "Pizza Margherita", price: "₹250", description: "Classic Italian pizza", image: "/Pizza Margherita.jpeg" },
      { name: "Burger", price: "₹150", description: "Juicy beef/chicken burger", image: "/Burger.jpeg" },
      { name: "Pasta Alfredo", price: "₹200", description: "Creamy white sauce pasta", image: "/Pasta Alfredo.webp" }
    ],
    desserts: [
      { name: "Gulab Jamun", price: "₹80", description: "Sweet milk dumplings in syrup", image: "/Gulab Jamun.webp" },
      { name: "Brownie with Ice Cream", price: "₹120", description: "Rich chocolate brownie with ice cream", image: "/Brownie with Ice Cream.jpg" },
      { name: "Jalebi", price: "₹60", description: "Crispy sweet spirals", image: "/Jalebi.jpg" },
      { name: "Rasgulla", price: "₹70", description: "Soft cheese balls in sugar syrup", image: "/Rasgulla.jpg" },
      { name: "Ice Cream Sundae", price: "₹100", description: "Ice cream with toppings", image: "/Ice Cream Sundae.jpeg" },
      { name: "Chocolate Cake", price: "₹150", description: "Rich chocolate layer cake", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300" },
      { name: "Vanilla Ice Cream", price: "₹60", description: "Classic vanilla flavor", image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=300" },
      { name: "Fruit Salad", price: "₹80", description: "Fresh mixed fruits", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300" },
      { name: "Kheer", price: "₹70", description: "Rice pudding with nuts", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300" },
      { name: "Cheesecake", price: "₹140", description: "Creamy cheese dessert", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=300" },
      { name: "Tiramisu", price: "₹160", description: "Italian coffee dessert", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300" },
      { name: "Kulfi", price: "₹50", description: "Traditional Indian ice cream", image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=300" }
    ],
    beverages: [
      { name: "Fresh Lime Soda", price: "₹40", description: "Refreshing citrus drink", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300" },
      { name: "Lassi", price: "₹60", description: "Traditional yogurt drink", image: "https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=300" },
      { name: "Masala Chai", price: "₹30", description: "Spiced Indian tea", image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=300" },
      { name: "Fresh Juice", price: "₹80", description: "Seasonal fruit juices", image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=300" },
      { name: "Cold Coffee", price: "₹70", description: "Chilled coffee with ice cream", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300" },
      { name: "Soft Drinks", price: "₹50", description: "Assorted carbonated drinks", image: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=300" },
      { name: "Mango Shake", price: "₹90", description: "Thick mango milkshake", image: "https://images.unsplash.com/photo-1553787434-6e5d6425c0c8?w=300" },
      { name: "Chocolate Shake", price: "₹85", description: "Rich chocolate milkshake", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300" },
      { name: "Green Tea", price: "₹40", description: "Healthy herbal tea", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300" },
      { name: "Lemonade", price: "₹50", description: "Fresh lemon water", image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=300" },
      { name: "Buttermilk", price: "₹35", description: "Spiced yogurt drink", image: "https://images.unsplash.com/photo-1553787434-6e5d6425c0c8?w=300" },
      { name: "Energy Drink", price: "₹60", description: "Refreshing energy booster", image: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=300" }
    ]
  };

  const categories = [
    { id: 'starters', name: 'Starters', icon: FaUtensils },
    { id: 'main', name: 'Main Course', icon: FaDrumstickBite },
    { id: 'desserts', name: 'Desserts', icon: FaCookie },
    { id: 'beverages', name: 'Beverages', icon: FaCoffee }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Menu</h1>
          <p className="text-xl text-gray-600">Delicious dishes crafted with love and finest ingredients</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${
                activeCategory === category.id
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-amber-100 shadow'
              }`}
            >
              <category.icon className="text-xl" />
              {category.name}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {menuCategories[activeCategory].map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                  <span className="text-lg font-bold text-amber-600">{item.price}</span>
                </div>
                <p className="text-gray-600 text-sm">{item.description}</p>
                <button className="mt-4 w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors">
                  Add to Order
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Special Packages */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Special Packages</h2>
            <p className="text-lg text-gray-600">Complete catering solutions for your special events</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Package */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaGift className="text-3xl text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Basic Package</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-amber-600">₹250</span>
                <span className="text-gray-500">/person</span>
              </div>
              <ul className="text-left space-y-3 text-gray-600 mb-8">
                <li className="flex items-center"><span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>2 Starters</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>3 Main Dishes</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>1 Dessert</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>Beverages</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>Basic Service</li>
              </ul>
              <button 
                onClick={() => {setSelectedPackage('Basic'); setShowBookingModal(true);}} 
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Choose Basic
              </button>
            </div>

            {/* Premium Package */}
            <div className="bg-white rounded-xl shadow-xl p-8 text-center border-2 border-amber-600 transform scale-105 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-amber-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaStar className="text-3xl text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Premium Package</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-amber-600">₹400</span>
                <span className="text-gray-500">/person</span>
              </div>
              <ul className="text-left space-y-3 text-gray-600 mb-8">
                <li className="flex items-center"><span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>4 Starters</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>5 Main Dishes</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>2 Desserts</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>Live Counters</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>Premium Beverages</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>Professional Service</li>
              </ul>
              <button 
                onClick={() => {setSelectedPackage('Premium'); setShowBookingModal(true);}} 
                className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors font-semibold"
              >
                Choose Premium
              </button>
            </div>

            {/* Royal Package */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCrown className="text-3xl text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Royal Package</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-amber-600">₹600</span>
                <span className="text-gray-500">/person</span>
              </div>
              <ul className="text-left space-y-3 text-gray-600 mb-8">
                <li className="flex items-center"><span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>6 Starters</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>8 Main Dishes</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>3 Desserts</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>Live Counters</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>Bar Setup</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>Decoration & VIP Service</li>
              </ul>
              <button 
                onClick={() => {setSelectedPackage('Royal'); setShowBookingModal(true);}} 
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
              >
                Choose Royal
              </button>
            </div>
          </div>
        </div>

        {/* Booking Modal */}
        {showBookingModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Book {selectedPackage} Package</h3>
                <button 
                  onClick={() => setShowBookingModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                  <input type="number" min="1" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500" />
                </div>
                <div className="flex gap-3 mt-6">
                  <button 
                    type="button" 
                    onClick={() => setShowBookingModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                  >
                    Book Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;