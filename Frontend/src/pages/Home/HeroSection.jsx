import React, { useEffect } from "react";
import AOS from "aos"; // Import AOS JavaScript
import "aos/dist/aos.css"; // Import AOS CSS

const HeroSection = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section className="relative text-white h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute top-0 left-0 w-full h-[100vh] bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url('/images/Herobg.png')",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 md:px-12">
        <h1
          data-aos="fade-up"
          data-aos-duration="1000"
          className="text-5xl sm:text-6xl font-bold leading-tight mb-4"
        >
          Find Your Lost Items or Report Found Ones
        </h1>
        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-lg sm:text-xl mb-6"
        >
          The easiest way to report and discover lost or found items in your
          area.
        </p>

        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="flex justify-center gap-6"
        >
          <button className="bg-[#6d28d9] text-white px-8 py-3 text-lg font-semibold rounded-lg hover:bg-[#4c1d95] transition-all shadow-md">
            Report Lost Item
          </button>
          <button className="bg-transparent border-2 border-white text-white px-8 py-3 text-lg font-semibold rounded-lg hover:bg-[#0c4a6e] transition-all shadow-md">
            Report Found Item
          </button>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="600"
          className="relative mt-8 max-w-md mx-auto"
        >
          <input
            type="text"
            placeholder="Search for items (e.g., 'iPhone 14')"
            className="w-full p-3 text-lg rounded-md border-none shadow-md focus:outline-none focus:ring-2 focus:ring-[#bae6fd] transition-all text-black pl-12"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="gray"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17.67 9.34A8 8 0 1110 2a8 8 0 017.67 7.34z"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
