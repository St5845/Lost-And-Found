import React from "react";

const LogoutButton = () => {
  const handleLogout = () => {
    alert("Logged out successfully!");
    // Add logout logic here (e.g., clear session, redirect to login page)
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
