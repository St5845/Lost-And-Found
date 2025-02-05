import mongoose from "mongoose";

// Define the schema for an item
const itemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    itemType: {
      type: String,
      enum: ["Lost", "Found"], // Ensures the value is either "Lost" or "Found"
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    founderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    status: {
      type: String,
      enum: ["Active", "Resolved"],
      default: "Active",
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set the timestamp
    },
    images: {
      type: [String],
      required: true,
    },
    resolvedAt: Date,
    // Optional: Support multiple images
  },

  { timestamps: true }
);

// Add validation logic for ownerId or founderId
itemSchema.pre("save", function (next) {
  if (!this.ownerId && !this.founderId) {
    return next(new Error("Either ownerId or founderId is required."));
  }
  next();
});

// Create the model from the schema
const Item = mongoose.model("Item", itemSchema);

export default Item;
