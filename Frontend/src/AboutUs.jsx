import { motion } from "framer-motion";
import "aos/dist/aos.css";
import { useEffect } from "react";
import AOS from "aos";
import { FaUsers, FaSearch, FaHandHoldingHeart } from "react-icons/fa";
import Navbar from "./pages/Home/Navbar";

export default function AboutUs() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="bg-gray-900 text-white min-h-screen p-8">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto text-center py-16">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-bold mb-4"
          >
            About Lost & Found
          </motion.h1>
          <p
            className="text-lg max-w-3xl mx-auto opacity-80"
            data-aos="fade-up"
          >
            Lost & Found is a community-driven platform dedicated to helping
            people recover lost items efficiently. Our goal is to bridge the gap
            between finders and seekers in a seamless way.
          </p>
        </div>

        {/* Image Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6"
          data-aos="fade-up"
        >
          <img
            src="/images/AboutUs1.jpg"
            alt="Lost Item"
            className="rounded-lg shadow-lg hover:scale-105 transition"
          />
          <img
            src="/images/AboutUs3.jpg"
            alt="Found Item"
            className="rounded-lg shadow-lg hover:scale-105 transition"
          />
          <img
            src="/images/AboutUs2.jpg"
            alt="Community Help"
            className="rounded-lg shadow-lg hover:scale-105 transition"
          />
        </div>

        {/* How It Works Section */}
        <div
          className="text-center max-w-4xl mx-auto mt-12"
          data-aos="fade-left"
        >
          <h2 className="text-3xl font-semibold mb-4">How It Works</h2>
          <p className="opacity-80 text-2x">
            Whether you've lost something or found an item, our platform
            provides a simple way to connect and ensure lost belongings return
            to their owners.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 px-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-[#1b4f72] rounded-xl shadow-lg text-center"
          >
            <FaSearch size={40} className="mx-auto mb-3" />
            <h3 className="text-xl font-semibold">Report Lost Items</h3>
            <p className="opacity-75 mt-2">
              Easily list your lost belongings and get notified when someone
              finds them.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-[#215383] rounded-xl shadow-lg text-center"
          >
            <FaHandHoldingHeart size={40} className="mx-auto mb-3" />
            <h3 className="text-xl font-semibold">Report Found Items</h3>
            <p className="opacity-75 mt-2">
              Help reunite lost items with their rightful owners quickly and
              efficiently.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-[#123456] rounded-xl shadow-lg text-center"
          >
            <FaUsers size={40} className="mx-auto mb-3" />
            <h3 className="text-xl font-semibold">Community Support</h3>
            <p className="opacity-75 mt-2">
              Join a network of helpful individuals making a difference.
            </p>
          </motion.div>
          {/* Call to Action */}
          <div className="text-center ">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="px-6 py-3 bg-[#1e40af] text-white font-semibold rounded-lg shadow-lg hover:bg-[#1e3a8a] transition"
            >
              Join the Community
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
