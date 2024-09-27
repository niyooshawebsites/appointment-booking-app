const Appointment = require("../models/appointment.model");
const appointmentConfirmationEmail = require("../utils/mail");

const bookAppointmnentController = async (req, res) => {
  try {
    const {
      service,
      date,
      time,
      firstName,
      lastName,
      email,
      contactNo,
      age,
      gender,
      address,
      city,
      state,
      pinCode,
      paymentMethod,
      serviceProvider,
    } = req.body;

    // if service is not selected
    if (!service) {
      return res.status(401).json({
        succss: false,
        msg: "Please select the service",
      });
    }

    // if date is not selected
    if (!date) {
      return res.status(401).json({
        succss: false,
        msg: "Please select the date",
      });
    }

    // if time is not selected
    if (!time) {
      return res.status(401).json({
        succss: false,
        msg: "Please select the time",
      });
    }

    // if firstname is not provided
    if (!firstName) {
      return res.status(401).json({
        succss: false,
        msg: "Please provide your first name",
      });
    }

    // if lastName is not provided
    if (!lastName) {
      return res.status(401).json({
        succss: false,
        msg: "Please provide your last name",
      });
    }

    // if email is not provided
    if (!email) {
      return res.status(401).json({
        succss: false,
        msg: "Please provide your email",
      });
    }

    // if contactNo is not provided
    if (!contactNo) {
      return res.status(401).json({
        succss: false,
        msg: "Please provide your contact number",
      });
    }

    // if age is not provided
    if (!age) {
      return res.status(401).json({
        succss: false,
        msg: "Please provide your age",
      });
    }

    // if gender is not selected
    if (!gender) {
      return res.status(401).json({
        succss: false,
        msg: "Please select your gender",
      });
    }

    // if address is not provided
    if (!address) {
      return res.status(401).json({
        succss: false,
        msg: "Please provide your address",
      });
    }

    // if city is not provided
    if (!city) {
      return res.status(401).json({
        succss: false,
        msg: "Please provide your city",
      });
    }

    // if state is not provided
    if (!state) {
      return res.status(401).json({
        succss: false,
        msg: "Please provide your state",
      });
    }

    // if pinCode is not provided
    if (!pinCode) {
      return res.status(401).json({
        succss: false,
        msg: "Please provide your pincode",
      });
    }

    // if paymentMethod is not selected
    if (!paymentMethod) {
      return res.status(401).json({
        succss: false,
        msg: "Please select your payment method",
      });
    }

    // if Service provider is not selected
    if (!serviceProvider) {
      return res.status(401).json({
        succss: false,
        msg: "Service provider is missing",
      });
    }

    // if all the information is provided
    const existingCustomer = new Appointment({
      service,
      date,
      time,
      firstName,
      lastName,
      email,
      contactNo,
      age,
      gender,
      address,
      city,
      state,
      pinCode,
      paymentMethod,
    });

    const result = await existingCustomer.save();

    if (!result) {
      return res.status(500).json({
        success: false,
        msg: "Appointment booking failed. Please try again",
      });
    }

    const fullName = `${firstName} ${lastName}`;

    appointmentConfirmationEmail(
      email,
      "Appointment confirmed",
      fullName,
      serviceProvider,
      service,
      date,
      time
    );

    return res.status(201).json({
      success: true,
      msg: "Appointment booked successfully",
    });
  } catch (err) {
    console.error("Error occurred:", err);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};

const getAllAppointmentsController = async (req, res) => {
  try {
    const { username } = req.body;
    const appAppointments = await Appointment.find({ username })
      .limit(10)
      .sort({ date: -1, time: -1 });

    // fetching successful
    if (appAppointments) {
      return res.status(200).json({
        success: true,
        msg: "Appointments fetched successfully",
        data: appAppointments,
      });
    }

    // fetching unsuccessful
    if (appAppointments) {
      return res.status(409).json({
        success: false,
        msg: "Appointments fetching falied",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

module.exports = {
  bookAppointmnentController,
  getAllAppointmentsController,
};
