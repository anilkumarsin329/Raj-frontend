import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

// Common Components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import BackToTop from "./Components/BackToTop";
import Chatbot from "./Components/Chatbot";

const AUTH_PATHS = ["/login", "/signup"];

// Pages / Sections
import Hero from "./Components/Hero";
import About from "./Components/About";
import Services from "./Components/Services";
import Menu from "./Components/Menu";
import Gallery from "./Components/Gallery";
import Testimonials from "./Components/Testimonials";
import Booking from "./Components/Booking";
import Contact from "./Components/Contact";
// Login And Signup
import Signup from "./Components/Signup";
import Login from "./Components/Login";
// Payment
import Payment from "./Components/Payment";
// Service Pages
import WeddingCatering from "./Components/WeddingCatering";
import CorporateEvents from "./Components/CorporateEvents";
import PrivateParties from "./Components/PrivateParties";
import LiveCounters from "./Components/LiveCounters";
import Decoration from "./Components/Decoration";
import Staffing from "./Components/Staffing";
import Rental from "./Components/Rental";
// Admin Dashboard




function AppContent() {
  const { pathname } = useLocation();
  const isAuthPage = AUTH_PATHS.includes(pathname);

  return (
    <>
      {!isAuthPage && <BackToTop />}
      {!isAuthPage && <Chatbot />}
      {!isAuthPage && <Navbar />}

      <Routes>

        {/* HOME PAGE */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
              <Services />
              <Menu />
              <Gallery />
              <Testimonials />
              <Booking />
              <Contact />
              <Footer />
            </>
          }
        />

        {/* INDIVIDUAL PAGES */}
        <Route path="/about" element={<><About /><Footer /></>} />
        <Route path="/services" element={<><Services /><Footer /></>} />
        <Route path="/menu" element={<><Menu /><Footer /></>} />
        <Route path="/gallery" element={<><Gallery /><Footer /></>} />
        <Route path="/testimonials" element={<><Testimonials /><Footer /></>} />
        <Route path="/contact" element={<><Contact /><Footer /></>} />
        <Route path="/booking" element={<><Booking /><Footer /></>} />

        {/* EXTRA (Navbar ke liye) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/payment" element={<Payment />} />
        
        {/* Service Pages */}
        <Route path="/wedding-catering" element={<><WeddingCatering /><Footer /></>} />
        <Route path="/corporate-events" element={<><CorporateEvents /><Footer /></>} />
        <Route path="/private-parties" element={<><PrivateParties /><Footer /></>} />
        <Route path="/live-counters" element={<><LiveCounters /><Footer /></>} />
        <Route path="/decoration" element={<><Decoration /><Footer /></>} />
        <Route path="/staffing" element={<><Staffing /><Footer /></>} />
        <Route path="/rental" element={<><Rental /><Footer /></>} />
     

      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
