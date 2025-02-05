import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const StatisticsSection = () => {
  const [itemsReunited, setItemsReunited] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [recoveryRate, setRecoveryRate] = useState(0);

  const [reviews, setReviews] = useState([
    { user: "Alice", review: "This platform helped me reconnect with a lost item. Amazing service!" },
    { user: "John", review: "The community is so helpful, and I found my missing item within hours." },
    { user: "Sarah", review: "Incredible experience! I’m so grateful for this service and the team behind it." },
  ]);

  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  // Simulating dynamic stats incrementing
  useEffect(() => {
    const interval = setInterval(() => {
      setItemsReunited((prevCount) => prevCount + Math.floor(Math.random() * 10));
      setActiveUsers((prevCount) => prevCount + Math.floor(Math.random() * 5));
      setRecoveryRate((prevRate) => prevRate + 0.1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Simulating dynamic review change every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 3000); // Change review every 3 seconds

    return () => clearInterval(interval);
  }, [reviews.length]);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section className="custom-background  bg-gradient-to-b from-[#1e1b4b] to-[#1a202c] py-12 px-6 md:px-12 lg:px-20 text-center relative overflow-hidden ">
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" data-aos="fade-up">
        Making a Difference Every Day
      </h2>
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex flex-wrap justify-center gap-6">
          {/* Stats Boxes */}
          <div className="w-full sm:w-1/2 md:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-up">
              <h3 className="text-xl font-bold text-[#1f2937] mb-2">
                {itemsReunited.toLocaleString()}+ Items Reunited
              </h3>
              <p className="text-gray-700">Helping people find what matters.</p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-up" data-aos-delay="200">
              <h3 className="text-xl font-bold text-[#1f2937] mb-2">
                {activeUsers.toLocaleString()} Active Users
              </h3>
              <p className="text-gray-700">Building a strong community.</p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-up" data-aos-delay="400">
              <h3 className="text-xl font-bold text-[#1f2937] mb-2">
                {recoveryRate.toFixed(1)}% Recovery Rate
              </h3>
              <p className="text-gray-700">Efficiently reuniting items with owners.</p>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="w-full sm:w-1/2 md:w-1/3 ">
            <div className="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-up" data-aos-delay="600">
              <h3 className="text-xl font-bold text-[#1f2937] mb-2">What Our Users Say</h3>
              <p className="text-gray-700 italic">"{reviews[currentReviewIndex].review}"</p>
              <p className="text-gray-600 mt-2">- {reviews[currentReviewIndex].user}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 relative z-10" data-aos="fade-up" data-aos-delay="600">
          <p className="text-lg text-white mb-4">
            "Join us in connecting lost items with their rightful owners."
          </p>
          <button className="bg-[#6d28d9] text-white px-8 py-3 text-lg font-semibold rounded-lg hover:bg-[#4c1d95] transition-all shadow-md">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
