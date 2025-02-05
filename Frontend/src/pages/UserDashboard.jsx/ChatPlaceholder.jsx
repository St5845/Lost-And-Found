import React from "react";
import { motion } from "framer-motion";

const FAQs = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-bold mb-4">FAQs & Help</h2>
      <div className="space-y-4">
        <p>
          <strong>Q: How do I report a lost item?</strong>
        </p>
        <p>A: Go to the "Report Item" section and fill out the form.</p>
        <p>
          <strong>Q: How do I change the status of an item?</strong>
        </p>
        <p>
          A: Click the "Mark as Resolved" button in the Items History section.
        </p>
      </div>
    </motion.div>
  );
};

export default FAQs;
