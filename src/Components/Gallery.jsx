import React, { useState } from "react";
import { FaEye, FaHeart, FaShare, FaDownload } from "react-icons/fa";

export default function Gallery() {
  const categories = ["All", "Food", "Beverages", "Events", "Decoration"];

  const images = [
    { src: "./gal1.jpg", category: "Food", title: "Delicious Biryani", description: "Aromatic basmati rice with premium spices" },
    { src: "./gal2.webp", category: "Food", title: "Fresh Salads", description: "Healthy and colorful vegetable salads" },
    { src: "./gal3.jpg", category: "Beverages", title: "Refreshing Drinks", description: "Fresh juices and mocktails" },
    { src: "./gal4.jpg", category: "Beverages", title: "Coffee & Tea", description: "Premium hot beverages selection" },
    { src: "./gal5.jpg", category: "Events", title: "Wedding Setup", description: "Elegant wedding catering arrangement" },
    { src: "./gal6.jpg", category: "Events", title: "Corporate Event", description: "Professional business lunch setup" },
    { src: "./gal7.jpeg", category: "Decoration", title: "Table Decoration", description: "Beautiful table setting with flowers" },
    { src: "./gal8.jpg", category: "Decoration", title: "Event Decor", description: "Stunning event decoration setup" },
  ];

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredImages =
    activeCategory === "All"
      ? images
      : images.filter((img) => img.category === activeCategory);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our <span className="text-amber-600">Gallery</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our stunning collection of catering services, delicious food presentations, and memorable event setups.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-amber-600 text-white shadow-lg transform scale-105"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-amber-600 hover:text-white hover:shadow-md"
              }`}
            >
              {cat} ({activeCategory === cat ? filteredImages.length : images.filter(img => cat === 'All' || img.category === cat).length})
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredImages.map((img, idx) => (
            <div
              key={idx}
              className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-bold text-lg mb-1">{img.title}</h3>
                  <p className="text-sm text-gray-200 mb-3">{img.description}</p>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(img);
                      }}
                      className="flex items-center gap-1 px-3 py-1 bg-amber-600 text-white rounded-full text-sm hover:bg-amber-700 transition-colors"
                    >
                      <FaEye className="text-xs" />
                      View
                    </button>
                    <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                      <FaHeart className="text-sm" />
                    </button>
                  </div>
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-amber-600 text-white text-xs font-semibold rounded-full">
                    {img.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* No Results */}
        {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📸</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No images found</h3>
            <p className="text-gray-600">Try selecting a different category</p>
          </div>
        )}
        
        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6 bg-amber-50 rounded-xl">
            <h3 className="text-3xl font-bold text-amber-600">{images.length}+</h3>
            <p className="text-gray-600 font-medium">Gallery Images</p>
          </div>
          <div className="p-6 bg-green-50 rounded-xl">
            <h3 className="text-3xl font-bold text-green-600">{images.filter(img => img.category === 'Food').length}+</h3>
            <p className="text-gray-600 font-medium">Food Photos</p>
          </div>
          <div className="p-6 bg-blue-50 rounded-xl">
            <h3 className="text-3xl font-bold text-blue-600">{images.filter(img => img.category === 'Events').length}+</h3>
            <p className="text-gray-600 font-medium">Event Setups</p>
          </div>
          <div className="p-6 bg-purple-50 rounded-xl">
            <h3 className="text-3xl font-bold text-purple-600">{categories.length - 1}+</h3>
            <p className="text-gray-600 font-medium">Categories</p>
          </div>
        </div>
      </div>

      {/* Enhanced Modal (Lightbox) */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full">
            {/* Image */}
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
            
            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-2xl">
              <h3 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h3>
              <p className="text-gray-200 mb-4">{selectedImage.description}</p>
              
              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
                  <FaDownload className="text-sm" />
                  Download
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors">
                  <FaShare className="text-sm" />
                  Share
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors">
                  <FaHeart className="text-sm" />
                  Like
                </button>
              </div>
            </div>
            
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 p-3 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Background Click to Close */}
          <div 
            className="absolute inset-0 -z-10" 
            onClick={() => setSelectedImage(null)}
          ></div>
        </div>
      )}
    </section>
  );
}