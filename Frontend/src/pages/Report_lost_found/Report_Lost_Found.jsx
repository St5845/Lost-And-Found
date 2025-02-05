import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../Home/Navbar";
import useItemStore from "../../store/itemStore"; // Import the Zustand store

const ReportLostAndFound = () => {
  AOS.init({
    duration: 1000,
    offset: 200,
  });

  const [currentImage, setCurrentImage] = useState(0);
  const {
    addItem,
    loading,
    error,
    successMessage: storeSuccessMessage,
  } = useItemStore(); // Extract addItem and loading, rename successMessage to storeSuccessMessage

  const images = [
    "/images/report-item4.jpg",
    "/images/report-item5.jpg",
    "/images/report-item3.jpg",
    "/images/report-item2.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const [formData, setFormData] = useState({
    itemName: "",
    itemType: "Lost",
    date: "",
    location: "",
    description: "",
    image: null,
    time: "",
  });

  const [successMessage, setSuccessMessage] = useState(""); // Renamed from storeSuccessMessage to avoid conflict
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      console.log("File selected:", files[0]); 
      setFormData({ ...formData, [name]: files[0] });
     
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateFile = (file) => {
    const allowedExtensions = ["jpeg", "jpg", "png"];
    const fileExtension = file?.name.split(".").pop().toLowerCase();
    return file && allowedExtensions.includes(fileExtension);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous error message
    setErrorMessage("");

    if (!formData.image) {
      setErrorMessage("Please upload an image of the item.");
      return;
    }

    if (!validateFile(formData.image)) {
      setErrorMessage("Only image files (JPEG, JPG, PNG) are allowed.");
      return;
    }

    const today = new Date();
    const selectedDate = new Date(formData.date);

    if (selectedDate > today) {
      setErrorMessage("Selected date cannot be in the future.");
      return;
    }

    // Call the addItem function from the Zustand store
    addItem(formData, formData.image)
      .then(() => {
        setSuccessMessage("Your item has been reported successfully!");
        setTimeout(() => setSuccessMessage(""), 5000);
      })
      .catch((error) => setErrorMessage(error.message));

      console.log("form Data: "+formData);

    // Clear form data
    setFormData({
      itemName: "",
      itemType: "Lost",
      date: "",
      location: "",
      description: "",
      image: null,
      time: "",
    });
  };











  
  const handleCancel = () => {
    setFormData({
      itemName: "",
      itemType: "Lost",
      date: "",
      location: "",
      description: "",
      image: null,
      time: "",
    });
    setSuccessMessage("");
    setErrorMessage("");

    

  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto flex flex-col md:flex-row items-center shadow-lg rounded-xl overflow-hidden my-auto bg-blue-50">
          {/* Left: Dynamic Image Section */}
          <div className="w-full md:w-1/2 relative" data-aos="fade-right">
            <img
              src={images[currentImage]}
              alt="Dynamic"
              className="w-full h-[340px] object-contain rounded-l-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end text-white p-6">
              <p className="text-lg font-bold">"Reuniting the lost"</p>
            </div>
          </div>

          {/* Right: Modernized Form */}
          <div className="w-full md:w-1/2 p-8" data-aos="fade-left">
            <h1 className="text-3xl font-extrabold text-blue-800 mb-6 p-4 rounded-lg bg-blue-100">
              Report Lost or Found Item
            </h1>

            {/* Success Message */}
            {successMessage && (
              <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4">
                <p>{successMessage}</p>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-4">
                <p>{errorMessage}</p>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-white shadow-md p-6 rounded-xl"
            >
              {/* Item Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Item Name
                </label>
                <input
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
                />
              </div>

              {/* Lost / Found Buttons */}
              <div className="flex space-x-4">
                <button
                  type="button"
                  className={`w-full py-2 text-white font-semibold rounded-lg ${
                    formData.itemType === "Lost" ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  onClick={() => setFormData({ ...formData, itemType: "Lost" })}
                >
                  Lost
                </button>
                <button
                  type="button"
                  className={`w-full py-2 text-white font-semibold rounded-lg ${
                    formData.itemType === "Found"
                      ? "bg-blue-600"
                      : "bg-gray-300"
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, itemType: "Found" })
                  }
                >
                  Found
                </button>
              </div>

              {/* Date & Time */}
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
                  rows="4"
                ></textarea>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Image
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  accept="image/*"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
                />
              </div>

              {/* Submit & Cancel Buttons */}
              <div className="flex space-x-4">
                <button
                  type="button"
                  className="w-full py-2 text-white font-semibold rounded-lg bg-red-600 hover:bg-red-700"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full py-2 text-white font-semibold rounded-lg bg-blue-600 hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportLostAndFound;
