const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema(
  {
    // service provider and client
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    // service provider and client
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    // service provider and client
    password: {
      type: String,
      required: true,
    },
    // service provider and client
    role: {
      type: Number,
      rquired: true,
      default: 0,
    },
    // service provider and client
    isVerified: {
      type: Boolean,
      default: false,
    },
    // service provider and client
    isAdmin: {
      type: Boolean,
      default: false,
    },
    // service provider
    name: {
      type: String,
      default: "",
    },
    // client
    firstName: {
      type: String,
      default: "",
    },
    // client
    lastName: {
      type: String,
      default: "",
    },
    // service provider
    gender: {
      type: String,
      default: "",
    },
    // client
    address: {
      type: String,
      default: "",
    },
    // service provider
    businessName: {
      type: String,
      default: "",
    },
    // service provider
    gst: {
      type: String,
      default: function () {
        return uuidv4(); // Function to generate a new UUID for each user
      },
      unique: true,
      sparse: true,
    },
    // service provider and client
    contactNo: {
      type: String,
      default: function () {
        return uuidv4(); // Function to generate a new 10 digit number for each user
      },
      unique: true,
      sparse: true,
    },
    // service provider
    office: {
      type: String,
      default: "",
    },
    // service provider
    floor: {
      type: String,
      default: "",
    },
    // service provider
    building: {
      type: String,
      default: "",
    },
    // service provider
    street: {
      type: String,
      default: "",
    },
    // service provider
    locality: {
      type: String,
      default: "",
    },
    // service provider
    district: {
      type: String,
      default: "",
    },
    // client
    city: {
      type: String,
      default: "",
    },
    // service provider and client
    state: {
      type: String,
      default: "",
    },
    // service provider and client
    pinCode: {
      type: Number,
      default: 0,
    },
    // service provider
    about: {
      type: String,
      default: "",
    },
    // service provider
    services: {
      type: Array,
      default: [],
    },
    // client
    paymentMethod: {
      type: Array,
      default: "",
    },
    // service provider
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
    specialization: {
      type: String,
      default: "",
    },
    // service provider
    qualifications: {
      type: String,
      default: "",
    },
    // service provider
    announcement: {
      type: String,
      default: "",
    },
    // service provider
    timings: {
      days: {
        monday: {
          morningFrom: {
            type: String,
            default: "",
          },
          morningTo: {
            type: String,
            default: "",
          },
          eveningFrom: {
            type: String,
            default: "",
          },
          eveningTo: {
            type: String,
            default: "",
          },
        },
        tuesday: {
          morningFrom: {
            type: String,
            default: "",
          },
          morningTo: {
            type: String,
            default: "",
          },
          eveningFrom: {
            type: String,
            default: "",
          },
          eveningTo: {
            type: String,
            default: "",
          },
        },
        wednesday: {
          morningFrom: {
            type: String,
            default: "",
          },
          morningTo: {
            type: String,
            default: "",
          },
          eveningFrom: {
            type: String,
            default: "",
          },
          eveningTo: {
            type: String,
            default: "",
          },
        },
        thursday: {
          morningFrom: {
            type: String,
            default: "",
          },
          morningTo: {
            type: String,
            default: "",
          },
          eveningFrom: {
            type: String,
            default: "",
          },
          eveningTo: {
            type: String,
            default: "",
          },
        },
        friday: {
          morningFrom: {
            type: String,
            default: "",
          },
          morningTo: {
            type: String,
            default: "",
          },
          eveningFrom: {
            type: String,
            default: "",
          },
          eveningTo: {
            type: String,
            default: "",
          },
        },
        saturday: {
          morningFrom: {
            type: String,
            default: "",
          },
          morningTo: {
            type: String,
            default: "",
          },
          eveningFrom: {
            type: String,
            default: "",
          },
          eveningTo: {
            type: String,
            default: "",
          },
        },
        sunday: {
          morningFrom: {
            type: String,
            default: "",
          },
          morningTo: {
            type: String,
            default: "",
          },
          eveningFrom: {
            type: String,
            default: "",
          },
          eveningTo: {
            type: String,
            default: "",
          },
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
