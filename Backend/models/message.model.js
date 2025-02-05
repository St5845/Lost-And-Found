import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat", // Reference to the chat to which the message belongs
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User who sent the message
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User who will receive the message
      required: true,
    },
    messageType: {
      type: String,
      enum: ["text", "image", "file", "verificationCode"], // Added "verificationCode" as a message type for handover
      default: "text", // Default message type is text
    },
    messageContent: {
      type: String,
      required: true, // Content of the message
    },
    attachmentUrl: {
      type: String, // URL of the attached file/image if any
    },
    seen: {
      type: Boolean,
      default: false, // Tracks whether the message has been seen
    },
    verificationCode: {
      type: String, // Code for handover verification (optional field, only relevant for verification messages)
      required: false, // Only required when the message is for verification
    },
    messageStatus: {
      type: String,
      enum: ["normal", "handoverVerification", "locationRequest"], // To track different message types
      default: "normal", // Default message type is normal
    },
    locationShared: {
      type: String, // Can store a location if the claimer shares one
      required: false, // Optional field
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
