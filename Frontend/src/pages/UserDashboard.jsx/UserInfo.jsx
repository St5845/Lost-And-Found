import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaSignOutAlt,
  FaUser,
  FaClock,
  FaQuestionCircle,
  FaComments,
  FaCamera,
} from "react-icons/fa";
import Navbar from "../Home/Navbar";
import { useAuthStore } from "../../store/authStore";

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [itemHistory, setItemHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const { logout } = useAuthStore();

  // Fetch user info
  useEffect(() => {
    fetch("http://localhost:5000/api/user-info", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // send cookies if any
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "User found") {
          setUserInfo(data.userInfo);
        } else {
          setError("User info not found");
        }
      })
      .catch(() => setError("Error fetching user info"));
  }, []);

  const handleLogout = async () => {
    try {
      await logout(); // Ensure logout completes successfully
      console.log("User logged out successfully"); // Optional: Add logging or redirect after logout
    } catch (error) {
      console.error("Logout failed:", error); // Handle potential errors
    }
  };

  // Fetch item history from the backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/items/user-items",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        if (!response.ok) {
          // Log the status code and error text for more details
          const errorText = await response.text();
          console.error("Fetch error:", response.status, errorText);
          throw new Error("Failed to fetch items");
        }

        const data = await response.json();
        console.log("Fetched items:", data);
        setItemHistory(data);
      } catch (err) {
        console.error("Error fetching items:", err);
        setError(err.message);
      }
    };

    fetchItems();
  }, []);

  const handleOpenModal = (index) => {
    setSelectedItemIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    // Reset selected item index and close the modal
    setSelectedItemIndex(null);
    setIsModalOpen(false);
  };

  const handleChangeStatus = () => {
    const itemToUpdate = itemHistory[selectedItemIndex];
    if (!itemToUpdate || !itemToUpdate._id) {
      console.error("Item ID is missing or invalid.");
      setError("Item ID is missing or invalid.");
      return;
    }

    // Confirm the ID is correct

    fetch(`http://localhost:5000/api/items/${itemToUpdate._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ status: "Resolved" }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update the item status");
        }
        console.log("Closing modal now1..");
        return response.json();
      })
      .then((data) => {
        console.log("Closing modal now2..");

        setItemHistory((prevState) =>
          prevState.map((item, i) =>
            i === selectedItemIndex ? { ...item, status: "Resolved" } : item
          )
        );

        // Debugging
        setSelectedItemIndex(null);
        setIsModalOpen(false);

        console.log("Modal state after closing:", isModalOpen); // Check if state updates
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        setError("Error updating status");
      });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInfo((prevState) => ({
          ...prevState,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-900 flex flex-col p-6">
        <div className="flex flex-col md:flex-row gap-6 mt-8">
          {/* Sidebar */}
          <motion.aside
            className="w-full md:w-1/4 bg-gray-800 p-6 shadow-lg rounded-xl space-y-6"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-white">Dashboard</h2>
            <ul className="space-y-4">
              {[
                { id: "profile", label: "User Info", icon: <FaUser /> },
                { id: "itemHistory", label: "Item History", icon: <FaClock /> },
                { id: "faqs", label: "FAQs", icon: <FaQuestionCircle /> },
                { id: "help", label: "Help & Support", icon: <FaComments /> },
              ].map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-3 w-full text-left p-3 rounded-lg transition duration-300 ease-in-out ${
                      activeSection === section.id
                        ? "bg-blue-700 text-white shadow-md"
                        : "hover:bg-gray-700 hover:text-blue-500"
                    }`}
                  >
                    <span className="text-white">{section.icon}</span>
                    <span className="text-white">{section.label}</span>
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={handleLogout}
              className="flex items-center text-red-500 gap-2 p-3 mt-4 w-full hover:bg-red-100 rounded-lg transition duration-300 ease-in-out"
            >
              <FaSignOutAlt className="text-red-500" /> Log out
            </button>
          </motion.aside>

          {/* Main Content */}
          <motion.main
            className="flex-1 p-6 bg-gray-800 shadow-lg rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {error && <p className="text-red-500">{error}</p>}
            {userInfo && activeSection === "profile" && (
              <div className="text-center">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <img
                      src={userInfo.profileImage || "./images/no_user.png"}
                      alt="User"
                      className="w-32 h-32 rounded-full border-4 border-blue-700"
                    />
                  </div>
                  <h2 className="text-2xl font-semibold mt-4 text-white">
                    {userInfo.name}
                  </h2>
                  <div className="mt-4">
                    <label
                      htmlFor="profile-image-upload"
                      className="flex items-center justify-center text-blue-700 bg-blue-500 py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300 text-white"
                    >
                      <FaCamera className="mr-2" /> Change Profile Picture
                    </label>
                    <input
                      id="profile-image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "Name", value: userInfo.name },
                    { label: "Email", value: userInfo.email },
                    { label: "Phone Number", value: userInfo.phoneNumber },
                    { label: "Gender", value: userInfo.gender },
                  ].map((field, index) => (
                    <div key={index}>
                      <label className="text-white text-sm mb-1 block">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        value={field.value}
                        readOnly
                        className="p-3 border-2 border-gray-600 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-700 transition duration-300 text-white bg-gray-700"
                      />
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-white">
                  Last Login: {new Date(userInfo.lastLogin).toLocaleString()}
                </p>
              </div>
            )}

            {activeSection === "itemHistory" && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-white">
                  Item History
                </h2>
                <table className="min-w-full mt-4 table-auto text-white rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-600 to-purple-700 text-sm text-white">
                      <th className="py-2 px-4 border-b">Item Name</th>
                      <th className="py-2 px-4 border-b">Item Type</th>
                      <th className="py-2 px-4 border-b">Date</th>
                      <th className="py-2 px-4 border-b">Status</th>
                      <th className="py-2 px-4 border-b">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemHistory.map((item, index) => (
                      <tr
                        key={index}
                        className="bg-gray-800 hover:bg-gray-700 transition duration-300 ease-in-out"
                      >
                        <td className="py-3 px-4 border-b">{item.itemName}</td>
                        <td className="py-3 px-4 border-b">{item.itemType}</td>
                        <td className="py-3 px-4 border-b">
                          {new Date(item.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </td>
                        <td className="py-3 px-4 border-b">
                          <span
                            className={`${
                              item.status === "Resolved"
                                ? "bg-red-500 text-white"
                                : "bg-green-500 text-white"
                            } py-1 px-3 rounded-full text-xs transition duration-300 ease-in-out`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 border-b flex justify-center">
                          {item.status === "Active" ? (
                            <button
                              className="text-white bg-blue-500 px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-600"
                              onClick={() => handleOpenModal(index)}
                            >
                              Update Status
                            </button>
                          ) : (
                            <span className="text-gray-400">
                              Item already updated
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Confirmation Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 backdrop-blur-md">
                <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                  <h3 className="text-lg font-semibold text-black mb-4">
                    Are you sure you want to change the status to "Resolved"?
                  </h3>
                  <div className="flex justify-between">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                      onClick={handleChangeStatus}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
