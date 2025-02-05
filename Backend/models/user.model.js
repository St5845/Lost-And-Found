import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    gender: { 
        type: String, 
        required: true, enum: ["male", "female", "other"] 
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpireAt: Date,
  },
  { timestamps: true }
);

// createat and updateat fields will be auto added into document 

const User=mongoose.model("User",userSchema);

export default User;