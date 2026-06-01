import React, { useEffect, useState } from "react";
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight, FaUserCircle } from "react-icons/fa";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Rahul Verma",
      role: "Wedding Client",
      event: "Wedding Reception",
      location: "Delhi",
      feedback:
        "Rajkumar Catering Services made our wedding reception unforgettable. The food was superb and service was exceptional!",
      rating: 5,
      date: "March 2024",
      verified: true
    },
    {
      id: 2,
      name: "Sneha Kapoor",
      role: "Corporate Client",
      event: "Annual Conference",
      location: "Mumbai",
      feedback:
        "Professional staff and unbeatable taste. All our guests were impressed at the company party.",
      rating: 5,
      date: "February 2024",
      verified: true
    },
    {
      id: 3,
      name: "Arjun Mehta",
      role: "Birthday Event",
      event: "50th Birthday Party",
      location: "Bangalore",
      feedback:
        "Decoration, food presentation and taste were top-notch! Highly recommended for any celebration.",
      rating: 5,
      date: "January 2024",
      verified: true
    },
    {
      id: 4,
      name: "Neha Singh",
      role: "Private Party",
      event: "House Warming",
      location: "Pune",
      feedback:
        "Amazing service, tasty food, and great attention to detail. Truly a premium catering experience!",
      rating: 4,
      date: "December 2023",
      verified: true
    },
    {
      id: 5,
      name: "Amit Rao",
      role: "Corporate Event",
      event: "Product Launch",
      location: "Hyderabad",
      feedback:
        "Timely delivery, great taste and professional team. Superb experience overall with excellent coordination.",
      rating: 5,
      date: "November 2023",
      verified: true
    },
    {
      id: 6,
      name: "Priya Sharma",
      role: "Wedding Client",
      event: "Engagement Ceremony",
      location: "Jaipur",
      feedback:
        "The team exceeded our expectations! Beautiful presentation and delicious food made our engagement memorable.",
      rating: 5,
      date: "October 2023",
      verified: true
    }
  ];

  const [current, setCurrent] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const [paused, setPaused] = useState(false);

  // responsive slidesToShow
  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w >= 1024) setSlidesToShow(3);
      else if (w >= 768) setSlidesToShow(2);
      else setSlidesToShow(1);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // ensure current is valid when slidesToShow changes
  const maxIndex = Math.max(0, testimonials.length - slidesToShow);
  useEffect(() => {
    if (current > maxIndex) setCurrent(0);
  }, [slidesToShow, maxIndex, current]);

  // autoplay
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(id);
  }, [maxIndex, paused]);

  const prev = () => setCurrent((prev) => (prev === 0 ? maxIndex : prev - 1));
  const next = () => setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));

  const slideWidth = 100 / slidesToShow; // percent

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Client <span className="text-amber-600">Testimonials</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real feedback from events we've catered — discover why clients trust us for their most important celebrations.
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Carousel viewport */}
          <div className="overflow-hidden">
            {/* Track */}
            <div
              className="flex transition-transform duration-700"
              style={{
                width: `${(testimonials.length * 100) / slidesToShow}%`,
                transform: `translateX(-${current * slideWidth}%)`,
              }}
            >
              {testimonials.map((t) => (
                <article
                  key={t.id}
                  className="p-4"
                  style={{ flex: `0 0 ${slideWidth}%` }}
                  aria-label={`testimonial-${t.id}`}
                >
                  <div className="bg-white rounded-2xl p-6 h-full flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                    {/* Quote Icon */}
                    <div className="relative">
                      <span className="absolute -top-2 -left-2 text-amber-600 text-2xl opacity-20">
                        <FaQuoteLeft />
                      </span>

                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                          {t.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-lg text-gray-800">{t.name}</h4>
                            {t.verified && (
                              <span className="text-green-500 text-sm">✓</span>
                            )}
                          </div>
                          <p className="text-sm text-amber-600 font-medium">{t.event}</p>
                          <p className="text-xs text-gray-500">{t.location} • {t.date}</p>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FaStar 
                            key={i} 
                            className={`text-sm ${
                              i < t.rating ? "text-amber-400" : "text-gray-300"
                            }`} 
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-2">({t.rating}/5)</span>
                      </div>

                      {/* Feedback */}
                      <p className="text-gray-700 leading-relaxed mb-4 italic" style={{ minHeight: 80 }}>
                        "{t.feedback}"
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-xs text-gray-500 font-medium">{t.role}</span>
                      {t.verified && (
                        <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          Verified Client
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <button
            onClick={prev}
            aria-label="Previous testimonials"
            className="absolute top-1/2 -translate-y-1/2 -left-4 p-3 bg-white border border-gray-300 hover:bg-amber-600 hover:text-white hover:border-amber-600 rounded-full text-gray-600 shadow-lg transition-all duration-300"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonials"
            className="absolute top-1/2 -translate-y-1/2 -right-4 p-3 bg-white border border-gray-300 hover:bg-amber-600 hover:text-white hover:border-amber-600 rounded-full text-gray-600 shadow-lg transition-all duration-300"
          >
            <FaChevronRight />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  current === i ? "bg-amber-600 w-8" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6 bg-amber-50 rounded-xl">
            <h3 className="text-3xl font-bold text-amber-600">{testimonials.length}+</h3>
            <p className="text-gray-600 font-medium">Happy Clients</p>
          </div>
          <div className="p-6 bg-green-50 rounded-xl">
            <h3 className="text-3xl font-bold text-green-600">
              {(testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)}⭐
            </h3>
            <p className="text-gray-600 font-medium">Average Rating</p>
          </div>
          <div className="p-6 bg-blue-50 rounded-xl">
            <h3 className="text-3xl font-bold text-blue-600">
              {testimonials.filter(t => t.verified).length}
            </h3>
            <p className="text-gray-600 font-medium">Verified Reviews</p>
          </div>
          <div className="p-6 bg-purple-50 rounded-xl">
            <h3 className="text-3xl font-bold text-purple-600">100%</h3>
            <p className="text-gray-600 font-medium">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
}