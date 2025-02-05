import mongoose from "mongoose";

// Chat Schema
const chatSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // References to the users involved in the chat
        required: true,
      },
    ],
    messages: [
      {
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Reference to the User who sent the message
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now, // Automatically set timestamp for the message
        },
      },
    ],
    chatName: {
      type: String,
      trim: true, // Optional field, useful for naming group chats or personal chats
    },
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message", // References the latest message in the chat
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item", // Reference to the item being claimed (from the Item model)
      required: true, // Ensures each chat is associated with an item
    },
    handoverVerified: {
      type: Boolean,
      default: false, // Initially set as false, this will track if the handover is verified
    },
    verificationCode: {
      type: String, // Code sent during handover verification
      required: false, // Ensures verification code is set for each handover
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Create and export the model
const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
