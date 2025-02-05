import React, { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import Carousel CSS
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS
import "../../index.css"; // Tailwind styles

const HowItWorksSection = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section className="bg-[#0f172a] py-16 px-6 md:px-12 lg:px-20">
      {/* Header Section */}
      <div
        className="text-center mb-12"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Reconnect with Your Lost Belongings
        </h1>
        <p className="text-md md:text-lg text-[#bfdbfe] max-w-2xl mx-auto">
          Our platform makes it easier to find and return lost items. Learn how
          it works and explore the latest found items below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image Slider */}
        <div
          className="w-full"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            className="rounded-lg shadow-lg"
          >
            <div>
              <img
                src="/images/lost-item3.webp"
                alt="Lost Item 1"
                className="rounded-lg object-contain h-[300px] w-full bg-white"
              />
              <p className="legend text-sm text-gray-600">
                Blue Backpack - Found at Central Park
              </p>
            </div>
            <div>
              <img
                src="/images/lost-item1.jpg"
                alt="Lost Item 2"
                className="rounded-lg object-contain h-[300px] w-full bg-white"
              />
              <p className="legend text-sm text-gray-600">
                Set of Keys - Found at Main Street
              </p>
            </div>
            <div>
              <img
                src="/images/lost-item2.webp"
                alt="Lost Item 3"
                className="rounded-lg object-contain h-[300px] w-full bg-white"
              />
              <p className="legend text-sm text-gray-600">
                Golden Ring - Found at Beachside
              </p>
            </div>
          </Carousel>
        </div>

        {/* How It Works Section */}
        <div
          className="w-full space-y-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h2 className="text-3xl font-bold text-white">
            How It Works
          </h2>

          {/* Steps */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-[#1d4ed8] text-white text-xl font-bold w-10 h-10 flex items-center justify-center rounded-full shadow-md">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Post Your Lost Item
                </h3>
                <p className="text-sm text-[#bfdbfe]">
                  Share details and photos of the item you've lost to alert
                  others and increase its visibility.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-[#1d4ed8] text-white text-xl font-bold w-10 h-10 flex items-center justify-center rounded-full shadow-md">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Browse Found Items
                </h3>
                <p className="text-sm text-[#bfdbfe]">
                  Explore the list of items reported as found in your area and
                  identify yours.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-[#1d4ed8] text-white text-xl font-bold w-10 h-10 flex items-center justify-center rounded-full shadow-md">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Connect & Retrieve
                </h3>
                <p className="text-sm text-[#bfdbfe]">
                  Contact the person who found your item and arrange to retrieve
                  it easily.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
