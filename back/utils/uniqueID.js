const cryptoJs = require("crypto-js");
const User = require("../models/user.model");
const Appointment = require("../models/appointment.model");

const generateUniqueID = (num) => {
  const randValue = Math.random().toString();
  const timeStamps = Date.now().toString();
  const hash = cryptoJs
    .MD5(randValue + timeStamps)
    .toString()
    .toUpperCase();
  return hash.slice(0, num);
};

const generateUniqueAppointmentID = async (id) => {
  try {
    const uniqueAppointmentID = generateUniqueID();
    const appointment = await Appointment.findOne({
      appointmentID: uniqueAppointmentID,
    });

    if (!appointment) {
      return uniqueAppointmentID;
    }

    const existingAppointmentID = appointment.appointmentID;
    while (uniqueAppointmentID == existingAppointmentID) {
      uniqueAppointmentID = generateUniqueID();
    }

    return uniqueAppointmentID;
  } catch (err) {
    console.log(err);
  }
};

const generateUniqueUserID = async () => {
  try {
    let uniqueUserID = generateUniqueID(8);

    const user = await User.findOne({ userID: uniqueUserID });

    if (!user) {
      return uniqueUserID;
    }

    const existingUserID = user.userID;
    while (uniqueUserID == existingUserID) {
      uniqueUserID = generateUniqueID(8);
    }

    return uniqueUserID;
  } catch (err) {
    console.log(err);
  }
};

const generateUniqueInvoiceID = async (num) => {
  try {
    let uniqueInvoiceID = generateUniqueID(8);

    const appointment = await Appointment.findOne({
      invoiceID: uniqueInvoiceID,
    });

    if (!appointment) {
      return uniqueInvoiceID;
    }

    const existingInvoiceID = appointment.invoiceID;
    while (uniqueInvoiceID == existingInvoiceID) {
      uniqueInvoiceID = generateUniqueID(8);
    }

    return uniqueInvoiceID;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  generateUniqueAppointmentID,
  generateUniqueUserID,
  generateUniqueInvoiceID,
};
