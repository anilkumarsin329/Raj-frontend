import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [openMega, setOpenMega] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenMega(null);
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setOpenMega(null);
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <header ref={navRef} className="w-full z-50">
      {/* Top bar */}
      <div className="hidden md:flex justify-between items-center px-4 md:px-8 py-2 bg-amber-600 text-sm text-white">
        <div className="flex items-center gap-4">
          <span>📞 +91 9918309983</span>
          <span className="hidden lg:inline">📧 anilkumarsingh43425@gmail.com</span>
        </div>
        <a
          href="https://wa.me/919918309983"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 hover:text-amber-200 transition-colors"
        >
          <span className="hidden sm:inline">WhatsApp</span>
          <span className="inline-block w-6 h-6 rounded-full bg-green-500 text-white text-center text-xs leading-6">💬</span>
        </a>
      </div>

      {/* Navbar */}
      <nav className={`${scrolled ? 'fixed' : 'sticky'} top-0 w-full transition-all duration-300 z-50 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' 
          : 'bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-200 shadow-md py-3'
      }`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/Logo.png"
              alt="Rajkumar Catering Services"
              className={`rounded-full object-cover border-2 border-amber-500 transition-all duration-300 ${
                scrolled ? 'w-10 h-10' : 'w-16 h-16'
              }`}
            />
            <div className="hidden sm:block">
              <h1 className={`font-bold transition-all duration-300 ${
                scrolled ? 'text-lg text-gray-800' : 'text-xl text-gray-800'
              }`}>
                Rajkumar Catering Services
              </h1>
              <p className={`text-xs text-gray-600 hidden md:block transition-all duration-300 ${
                scrolled ? 'opacity-80' : 'opacity-100'
              }`}>
                Premium Catering Services
              </p>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6">

            <NavLink to="/" className="hover:text-amber-500">Home</NavLink>
            <NavLink to="/about" className="hover:text-amber-500">About</NavLink>

            {/* Services Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setOpenMega("services")}
              onMouseLeave={() => setOpenMega(null)}
            >
              <button className="flex items-center gap-1 hover:text-amber-500">
                Services ▾
              </button>

              <div
                className={`absolute left-1/2 -translate-x-1/2 mt-2 w-[700px] bg-white text-slate-800 shadow-2xl rounded-lg p-6 transition-all duration-200 ${
                  openMega === "services" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 cursor-pointer">
                  <div>
                    <h4 className="font-semibold mb-3">Event Types</h4>
                    <ul className="space-y-2 text-sm">
                      <li><Link to="/wedding-catering" className="hover:text-amber-600 transition-colors">Wedding Catering</Link></li>
                      <li><Link to="/corporate-events" className="hover:text-amber-600 transition-colors">Corporate Events</Link></li>
                      <li><Link to="/private-parties" className="hover:text-amber-600 transition-colors">Private Parties</Link></li>
                      <li><Link to="/live-counters" className="hover:text-amber-600 transition-colors">Live Counters</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Add-ons</h4>
                    <ul className="space-y-2 text-sm">
                      <li><Link to="/decoration" className="hover:text-amber-600 transition-colors">Decoration</Link></li>
                      <li><Link to="/staffing" className="hover:text-amber-600 transition-colors">Staffing</Link></li>
                      <li><Link to="/rental" className="hover:text-amber-600 transition-colors">Rental</Link></li>
                    </ul>
                  </div>
                  <div className="hidden sm:flex items-center">
                    <div className="bg-slate-50 rounded-lg p-3 flex gap-3">
                      <img
                        src="https://www.saicaterer.in/wp-content/uploads/2025/05/reception-catering-live-counter-pc-chandra.jpg"
                        alt="featured"
                        className="w-28 h-20 object-cover rounded-md"
                      />
                      <div>
                        <h5 className="font-semibold text-sm">Wedding Buffet</h5>
                        <p className="text-xs text-slate-500">Live counters & bespoke decor.</p>
                        <Link to="/services" className="inline-block mt-1 text-xs text-green-600">Explore →</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setOpenMega("menu")}
              onMouseLeave={() => setOpenMega(null)}
            >
              <button className="flex items-center gap-1 hover:text-amber-500">
                Menu ▾
              </button>

              <div
                className={`absolute left-1/2 -translate-x-1/2 mt-2 w-[700px] bg-white text-slate-800 shadow-2xl rounded-lg p-6 transition-all duration-200 ${
                  openMega === "menu" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
                  <div>
                    <h4 className="font-semibold mb-3">Starters</h4>
                    <p><Link to="/menu#starters" className="hover:text-amber-600 transition-colors">Paneer Tikka</Link></p>
                    <p><Link to="/menu#starters" className="hover:text-amber-600 transition-colors">Spring Rolls</Link></p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Main</h4>
                    <p><Link to="/menu#main" className="hover:text-amber-600 transition-colors">Butter Chicken</Link></p>
                    <p><Link to="/menu#main" className="hover:text-amber-600 transition-colors">Biryani</Link></p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Desserts</h4>
                    <p><Link to="/menu#desserts" className="hover:text-amber-600 transition-colors">Gulab Jamun</Link></p>
                    <p><Link to="/menu#desserts" className="hover:text-amber-600 transition-colors">Brownie</Link></p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Beverages</h4>
                    <p><Link to="/menu#beverages" className="hover:text-amber-600 transition-colors">Soft Drinks</Link></p>
                    <p><Link to="/menu#beverages" className="hover:text-amber-600 transition-colors">Packages</Link></p>
                  </div>
                </div>
              </div>
            </div>

            <NavLink to="/gallery" className="hover:text-amber-500">Gallery</NavLink>
            <NavLink to="/testimonials" className="hover:text-amber-500">Testimonials</NavLink>
            <NavLink to="/contact" className="hover:text-amber-500">Contact</NavLink>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <NavLink 
              to="/booking" 
              className="hidden md:inline-block px-6 py-2 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              📞 Book Now
            </NavLink>
            <NavLink 
              to="/login" 
              className="hidden md:inline-block px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Login
            </NavLink>
            

            
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors" 
              onClick={() => setMobileOpen(true)}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className="block w-5 h-0.5 bg-current mb-1"></span>
                <span className="block w-5 h-0.5 bg-current mb-1"></span>
                <span className="block w-5 h-0.5 bg-current"></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-50 ${mobileOpen ? "" : "pointer-events-none"}`}>
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${mobileOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMobileOpen(false)}
        />

        <aside
          className={`fixed left-0 top-0 h-full w-[85vw] max-w-sm bg-white shadow-2xl transform transition-transform ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b bg-amber-50">
            <span className="font-bold text-gray-800 flex items-center gap-2">
              <img src="/Logo.png" alt="" className="w-8 h-8 rounded-full object-cover" />
              Rajkumar Catering Services
            </span>
            <button 
              onClick={() => setMobileOpen(false)}
              className="p-1 rounded-md text-gray-600 hover:bg-gray-200 transition-colors"
            >
              ✖
            </button>
          </div>

          <div className="px-4 py-4 space-y-3">
            <NavLink 
              to="/" 
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-gray-700 hover:text-amber-600 font-medium transition-colors"
            >
              Home
            </NavLink>
            <NavLink 
              to="/about" 
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-gray-700 hover:text-amber-600 font-medium transition-colors"
            >
              About
            </NavLink>

            <details>
              <summary className="py-2 text-gray-700 hover:text-amber-600 font-medium cursor-pointer">Services ▾</summary>
              <div className="pl-4 space-y-1 mt-2">
                <p className="py-1 text-sm text-gray-600">Wedding Catering</p>
                <p className="py-1 text-sm text-gray-600">Corporate Events</p>
                <p className="py-1 text-sm text-gray-600">Private Parties</p>
                <p className="py-1 text-sm text-gray-600">Live Counters</p>
              </div>
            </details>

            <details>
              <summary className="py-2 text-gray-700 hover:text-amber-600 font-medium cursor-pointer">Menu ▾</summary>
              <div className="pl-4 space-y-1 mt-2">
                <p className="py-1 text-sm text-gray-600">Starters</p>
                <p className="py-1 text-sm text-gray-600">Main Course</p>
                <p className="py-1 text-sm text-gray-600">Desserts</p>
                <p className="py-1 text-sm text-gray-600">Beverages</p>
              </div>
            </details>

            <NavLink 
              to="/gallery" 
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-gray-700 hover:text-amber-600 font-medium transition-colors"
            >
              Gallery
            </NavLink>
            <NavLink 
              to="/testimonials" 
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-gray-700 hover:text-amber-600 font-medium transition-colors"
            >
              Testimonials
            </NavLink>
            <NavLink 
              to="/contact" 
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-gray-700 hover:text-amber-600 font-medium transition-colors"
            >
              Contact
            </NavLink>
          </div>

          <div className="px-4 py-4 border-t bg-gray-50 space-y-3">
            <NavLink 
              to="/booking" 
              className="block bg-amber-600 text-white rounded-lg text-center py-3 font-semibold hover:bg-amber-700 transition-colors"
            >
              📞 Book Now
            </NavLink>
            <NavLink 
              to="/login" 
              className="block border border-gray-300 text-gray-700 rounded-lg text-center py-3 font-medium hover:bg-gray-100 transition-colors"
            >
              Login
            </NavLink>
          </div>
        </aside>
      </div>
    </header>
  );
}
