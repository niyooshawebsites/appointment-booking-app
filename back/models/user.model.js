const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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
    isAdmin: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: "",
    },
    businessName: {
      type: String,
      default: "",
    },
    gst: {
      type: String,
      default: function () {
        return uuidv4(); // Function to generate a new UUID for each user
      },
      unique: true,
      sparse: true,
    },
    contact: {
      type: String,
      default: function () {
        return uuidv4(); // Function to generate a new 10 digit number for each user
      },
      unique: true,
      sparse: true,
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
      default: 0,
    },
    about: {
      type: String,
      default: "",
    },
    services: {
      type: Array,
      default: [],
    },
    socialProfiles: {
      facebookUrl: {
        type: String,
        default: "https://facebook.com",
      },
      xUrl: {
        type: String,
        default: "https://x.com",
      },
      instagramUrl: {
        type: String,
        default: "https://instagram.com",
      },
      linkedInUrl: {
        type: String,
        default: "https://linkedin.com",
      },
      youtubeUrl: {
        type: String,
        default: "https://youtube.com",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
