const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      rquired: true,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: "",
      required: true,
    },
    businessName: {
      type: String,
      default: "",
      required: true,
    },
    gst: {
      type: String,
      default: "",
      unique: true,
      required: true,
    },
    contact: {
      type: Number,
      default: 0,
      required: true,
      unique: true,
    },
    office: {
      type: String,
      default: "",
    },
    floor: {
      type: String,
      default: "",
    },
    building: {
      type: String,
      default: "",
    },
    street: {
      type: String,
      default: "",
    },
    locality: {
      type: String,
      default: "",
    },
    district: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    pinCode: {
      type: Number,
      default: "",
    },
    about: {
      type: String,
      default: "",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
