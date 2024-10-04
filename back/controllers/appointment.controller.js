const Appointment = require("../models/appointment.model");
const User = require("../models/user.model");
const appointmentConfirmationEmail = require("../utils/mail");
const moment = require("moment");

// book appointment controller
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
      spUsername,
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

    const user = await User.findOne({ username: spUsername });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: `No service provider with the username ${spUsername} found`,
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
      user: user._id,
    });

    const result = await existingCustomer.save();

    if (!result) {
      return res.status(500).json({
        success: false,
        msg: "Appointment booking failed. Please try again",
      });
    }

    const fullName = `${firstName} ${lastName}`;

    await appointmentConfirmationEmail(
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

// get all Apponitments controller
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

// get today's appointments filter by username
const getTodayAppointmentsByUsernameController = async (req, res) => {
  try {
    const { username } = req.params;

    // getting today's date
    const todayDate = moment(Date.now()).format("DD-MM-YYYY");

    const filteredAppointments = await Appointment.find({
      date: todayDate,
    }).populate("User");

    // Filter appointments by username
    const appointments = filteredAppointments.filter(
      (appointment) => appointment.user.username === username
    );

    if (!appointments) {
      return res.status(204).json({
        success: false,
        msg: "No appointments for today",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Today's appointments found successfully",
      appointments,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

// get total appointments count filter by username
const getTotalAppointmentsCountByUsernameController = async (req, res) => {
  try {
    const { userId } = req.params;

    const filteredappointments = await Appointment.countDocuments({
      user: userId,
    });

    const totalAppointments = filteredappointments.length;

    if (totalAppointments === 0) {
      return res.status(204).json({
        success: false,
        msg: "No appointmentsfound",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Today's appointments found successfully",
      appointments: totalAppointments,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

// get today's appointment count filter by username
const getTodayAppointmentsCountByUsernameController = async (req, res) => {
  try {
    const { userId } = req.params;

    // getting today's date
    const todayDate = moment(Date.now()).format("YYYY-MM-DD");

    const filteredAppointments = await Appointment.countDocuments({
      user: userId,
      date: todayDate,
    });

    const totalAppointments = filteredAppointments.length;

    if (!filteredAppointments) {
      return res.status(404).json({
        success: false,
        msg: "No appointments for today",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Today's appointments found successfully",
      appointments: totalAppointments,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

// get total appointments count
const getTotalAppointmentsCountController = async (req, res) => {
  try {
    const totalAppointmentsCount = await Appointment.countDocuments();
    return res.status(200).json({
      success: true,
      msg: "Total number of appointments counted successfully",
      totalAppointmentsCount,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

// get today's total appointments count
const getTodayTotalAppointmentsCountController = async (req, res) => {
  try {
    // start of the day
    const startOfDay = moment().startOf("day").toDate().toISOString();

    // end of the day
    const endOfDay = moment().endOf("day").toDate().toISOString();

    const todayTotalAppointmentsCount = await Appointment.countDocuments({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    return res.status(200).json({
      success: true,
      msg: "Today's Total number of appointments counted successfully",
      todayTotalAppointmentsCount,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

module.exports = {
  bookAppointmnentController,
  getAllAppointmentsController,
  getTodayAppointmentsByUsernameController,
  getTotalAppointmentsCountController,
  getTodayTotalAppointmentsCountController,
  getTodayAppointmentsCountByUsernameController,
  getTotalAppointmentsCountByUsernameController,
};
