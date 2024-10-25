const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    appointmentID: {
      type: String,
      required: true,
      unique: true,
      default: "N/A",
    },
    invoiceID: {
      type: String,
      required: true,
      unique: true,
      default: "N/A",
    },
    patientID: {
      type: String,
      required: true,
      unique: true,
      default: "N/A",
    },
    service: {
      type: String,
      required: true,
      trim: true,
    },
    fee: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
    time: {
      type: String,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    contactNo: {
      type: Number,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    pinCode: {
      type: Number,
      required: true,
      trim: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    transactionID: {
      type: String,
      required: true,
      unique: true,
      default: "N/A",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
