import React, { useState } from 'react';


// SuccessMessage.js
const SuccessMessage = ({ message, onClose }) => {
  return (
    <div className="bg-green-100 text-green-800 border border-green-400 rounded-lg p-4 mb-4">
      <p>{message}</p>
      <button
        onClick={onClose}
        className="text-green-500 hover:text-green-700"
      >
        Close
      </button>
    </div>
  );
};

export default SuccessMessage;
