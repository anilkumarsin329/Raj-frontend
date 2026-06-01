// src/components/BackToTop.js
import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    visible && (
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-10 right-30 z-50 p-4 rounded-full 
                   bg-amber-600/90 backdrop-blur-md shadow-xl 
                   text-white hover:bg-amber-700 
                   transition transform hover:scale-110"
      >
        <FaArrowUp size={18} />
      </button>
    )
  );
}
