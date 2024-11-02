const Appointment = require("../models/appointment.model");
const User = require("../models/user.model");
const { appointmentConfirmationEmail } = require("../utils/mail");
const moment = require("moment");
const {
  generateUniqueAppointmentID,
  generateUniqueInvoiceID,
  generateUniqueUserID,
} = require("../utils/uniqueID");

// book appointment controller
// const bookAppointmnentController = async (req, res) => {
//   try {
//     const { username } = req.params;

//     const {
//       service,
//       fee,
//       date,
//       time,
//       patientUsername,
//       firstName,
//       lastName,
//       email,
//       contactNo,
//       age,
//       gender,
//       address,
//       city,
//       state,
//       pinCode,
//       serviceProvider,
//     } = req.body;

//     // if service is not selected
//     if (!service) {
//       return res.status(401).json({
//         succss: false,
//         msg: "Please select the service",
//       });
//     }

//     // if fee is not selected
//     if (!fee) {
//       return res.status(400).json({
//         succss: false,
//         msg: "Please provide the fee",
//       });
//     }

//     // if date is not selected
//     if (!date) {
//       return res.status(400).json({
//         succss: false,
//         msg: "Please select the date",
//       });
//     }

//     // if time is not selected
//     if (!time) {
//       return res.status(400).json({
//         succss: false,
//         msg: "Please select the time",
//       });
//     }

//     // if time is not selected
//     if (!patientUsername) {
//       return res.status(400).json({
//         succss: false,
//         msg: "Please provide Patient username",
//       });
//     }

//     // if firstname is not provided
//     if (!firstName) {
//       return res.status(400).json({
//         succss: false,
//         msg: "Please provide your first name",
//       });
//     }

//     // if lastName is not provided
//     if (!lastName) {
//       return res.status(400).json({
//         succss: false,
//         msg: "Please provide your last name",
//       });
//     }

//     // if email is not provided
//     if (!email) {
//       return res.status(400).json({
//         succss: false,
//         msg: "Please provide your email",
//       });
//     }

//     // if contactNo is not provided
//     if (!contactNo) {
//       return res.status(400).json({
//         succss: false,
//         msg: "Please provide your contact number",
//       });
//     }

//     // if age is not provided
//     if (!age) {
//       return res.status(400).json({
//         succss: false,
//         msg: "Please provide your age",
//       });
//     }

//     // if gender is not selected
//     if (!gender) {
//       return res.status(400).json({
//         succss: false,
//         msg: "Please select your gender",
//       });
//     }

//     // if address is not provided
//     if (!address) {
//       return res.status(400).json({
//         succss: false,
//         msg: "Please provide your address",
//       });
//     }

//     // if city is not provided
//     if (!city) {
//       return res.status(400).json({
//         succss: false,
//         msg: "Please provide your city",
//       });
//     }

//     // if state is not provided
//     if (!state) {
//       return res.status(400).json({
//         succss: false,
//         msg: "Please provide your state",
//       });
//     }

//     // if pinCode is not provided
//     if (!pinCode) {
//       return res.status(400).json({
//         succss: false,
//         msg: "Please provide your pincode",
//       });
//     }

//     // if Service provider is not selected
//     if (!serviceProvider) {
//       return res.status(400).json({
//         succss: false,
//         msg: "Service provider is missing",
//       });
//     }

//     const user = await User.findOne({ username });

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         msg: `No service provider with the username ${username} found`,
//       });
//     }

//     // get patient details
//     const client = await User.findOne({ username: patientUsername });

//     if (!client) {
//       return res.status(404).json({
//         success: false,
//         msg: "Client not found",
//       });
//     }

//     const clientID = client.userID;

//     // if all the information is provided
//     const newAppointment = new Appointment({
//       appointmentID: await generateUniqueAppointmentID(),
//       service: service.split(" ")[0],
//       invoiceID: await generateUniqueInvoiceID(),
//       patientID: clientID,
//       fee,
//       date,
//       time,
//       firstName,
//       lastName,
//       email,
//       contactNo,
//       age,
//       gender,
//       address,
//       city,
//       state,
//       pinCode,
//       user: user._id,
//     });

//     const result = await newAppointment.save();

//     if (!result) {
//       return res.status(500).json({
//         success: false,
//         msg: "Appointment booking failed. Please try again",
//       });
//     }

//     const fullName = `${firstName} ${lastName}`;

//     await appointmentConfirmationEmail(
//       email,
//       "Appointment confirmed",
//       fullName,
//       user.businessName,
//       service,
//       date,
//       time
//     );

//     return res.status(201).json({
//       success: true,
//       msg: "Appointment booked successfully",
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       msg: "Internal Server Error",
//       err: err.message,
//     });
//   }
// };

// book appointment controller
const bookAppointmnentByLoginController = async (req, res) => {
  try {
    const { username } = req.params;

    const {
      service,
      fee,
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
    } = req.body;

    // if service is not selected
    if (!service) {
      return res.status(400).json({
        succss: false,
        msg: "Please select the service",
      });
    }

    // if fee is not selected
    if (!fee) {
      return res.status(400).json({
        succss: false,
        msg: "Please provide the fee",
      });
    }

    // if date is not selected
    if (!date) {
      return res.status(400).json({
        succss: false,
        msg: "Please select the date",
      });
    }

    // if time is not selected
    if (!time) {
      return res.status(400).json({
        succss: false,
        msg: "Please select the time",
      });
    }

    // if firstname is not provided
    if (!firstName) {
      return res.status(400).json({
        succss: false,
        msg: "Please provide your first name",
      });
    }

    // if lastName is not provided
    if (!lastName) {
      return res.status(400).json({
        succss: false,
        msg: "Please provide your last name",
      });
    }

    // if email is not provided
    if (!email) {
      return res.status(400).json({
        succss: false,
        msg: "Please provide your email",
      });
    }

    // if contactNo is not provided
    if (!contactNo) {
      return res.status(400).json({
        succss: false,
        msg: "Please provide your contact number",
      });
    }

    // if age is not provided
    if (!age) {
      return res.status(400).json({
        succss: false,
        msg: "Please provide your age",
      });
    }

    // if gender is not selected
    if (!gender) {
      return res.status(400).json({
        succss: false,
        msg: "Please select your gender",
      });
    }

    // if address is not provided
    if (!address) {
      return res.status(400).json({
        succss: false,
        msg: "Please provide your address",
      });
    }

    // if city is not provided
    if (!city) {
      return res.status(400).json({
        succss: false,
        msg: "Please provide your city",
      });
    }

    // if state is not provided
    if (!state) {
      return res.status(400).json({
        succss: false,
        msg: "Please provide your state",
      });
    }

    // if pinCode is not provided
    if (!pinCode) {
      return res.status(400).json({
        succss: false,
        msg: "Please provide your pincode",
      });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: `No service provider with the username ${username} found`,
      });
    }

    const client = await User.findOne({ username: req.user.username });

    if (!client) {
      return res.status(404).json({
        success: false,
        msg: "Client not found",
      });
    }

    const clientID = client.userID;

    // if all the information is provided
    const existingCustomer = new Appointment({
      appointmentID: await generateUniqueAppointmentID(),
      service: service.split(" ")[0],
      invoiceID: await generateUniqueInvoiceID(),
      patientID: clientID,
      fee,
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
      user.businessName,
      service,
      date,
      time
    );

    return res.status(201).json({
      success: true,
      msg: "Appointment booked successfully",
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
      err: err.message,
    });
  }
};

// get all Apponitments controller filer by userid for a specific service provider
const getAllAppointmentsController = async (req, res) => {
  try {
    const { userId, currentPage } = req.params;
    const limit = 10;
    const currentPageNo = parseInt(currentPage) || 1;
    const skip = (currentPageNo - 1) * limit;

    const appointments = await Appointment.find({ user: userId })
      .skip(skip)
      .limit(limit)
      .sort({ date: -1, time: -1 });

    // calc total users to find total number of pages (total appointments/limit)
    const totalAppointments = await Appointment.countDocuments({
      user: userId,
    });

    // fetching unsuccessful
    if (appointments.length == 0) {
      return res.status(404).json({
        success: false,
        msg: "Appointments fetching falied",
      });
    }

    // fetching successful
    if (appointments) {
      return res.status(200).json({
        success: true,
        msg: "Appointments fetched successfully",
        appointments,
        currentPageNo,
        totalPages: Math.ceil(totalAppointments / limit),
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

// get all Apponitments controller filer by userid for a specific client
const getAllAppointmentsControllerForClient = async (req, res) => {
  try {
    const { email, currentPage } = req.params;
    const limit = 10;
    const currentPageNo = parseInt(currentPage) || 1;
    const skip = (currentPageNo - 1) * limit;
    const appointments = await Appointment.find({ email })
      .skip(skip)
      .limit(limit)
      .sort({ date: -1, time: -1 })
      .populate("user");

    // calc total number of pages (totalAppointments/limit)
    const totalAppointments = await Appointment.countDocuments({ email });

    // fetching unsuccessful
    if (appointments.length == 0) {
      return res.status(404).json({
        success: false,
        msg: "Appointments fetching falied",
      });
    }

    // fetching successful
    if (appointments) {
      return res.status(200).json({
        success: true,
        msg: "Appointments fetched successfully",
        appointments,
        currentPageNo,
        totalPages: Math.ceil(totalAppointments / limit),
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

// -----------------------------------------------------------------------------------------

// get today's appointments filter by userId - for service provider
const getTodayAppointmentsByUsernameController = async (req, res) => {
  try {
    const { userId, currentPage } = req.params;
    const limit = 10;
    const currentPageNo = parseInt(currentPage) || 1;
    const skip = (currentPageNo - 1) * limit;

    // getting today's date
    const todayDate = moment(Date.now()).format("YYYY-MM-DD");

    const filteredAppointments = await Appointment.find({
      date: todayDate,
    })
      .skip(skip)
      .limit(limit)
      .sort({ date: -1, time: -1 })
      .populate("user");

    // Filter appointments by username
    const appointments = filteredAppointments.filter(
      (appointment) => appointment.user._id == userId
    );

    // calc total users to find total number of pages (total appointments/limit)
    const totalPages = appointments.length;

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
      totalPages,
      currentPageNo,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

// get total appointments count filter by userId - for service provider
const getTotalAppointmentsCountByUsernameController = async (req, res) => {
  try {
    const { userId } = req.params;

    const filteredappointments = await Appointment.countDocuments({
      user: userId,
    });

    return res.status(200).json({
      success: true,
      msg: "Today's appointments found successfully",
      appointments: filteredappointments,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

// get total appointments count filter by userId - for client
const getTotalAppointmentsCountByUserForClientIdController = async (
  req,
  res
) => {
  try {
    const { email } = req.params;

    const filteredappointments = await Appointment.countDocuments({
      email: email,
    });

    return res.status(200).json({
      success: true,
      msg: "Today's appointments found successfully",
      appointments: filteredappointments,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

// get today's appointment count filter by username - for service provider
const getTodayAppointmentsCountByUsernameController = async (req, res) => {
  try {
    const { userId } = req.params;

    // getting today's date
    const todayDate = moment(Date.now()).format("YYYY-MM-DD");

    const filteredAppointments = await Appointment.countDocuments({
      user: userId,
      date: todayDate,
    });

    return res.status(200).json({
      success: true,
      msg: "Today's appointments found successfully",
      appointments: filteredAppointments,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
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
      err: err.message,
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
      err: err.message,
    });
  }
};

// get a particular apponitment
const getAParticaularApponitmentDetails = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findOne({ _id: appointmentId });

    if (!appointment) {
      return res.status(204).json({
        success: false,
        msg: "No such appointment found",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Appointment found successfully",
      appointment,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Something went wrong",
      err: err.message,
    });
  }
};

// check appointment availability
const checkAppointmentAvailability = async (req, res) => {
  try {
    const { date, time, username } = req.query;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(204).json({
        success: false,
        msg: "No such service provider available",
      });
    }

    const appointments = await Appointment.find({ user: user._id, date, time });

    if (appointments.length > 0) {
      return res.status(200).json({
        success: false,
        msg: "Sorry! The slot already booked. Pick a different one",
      });
    }

    if (appointments.length == 0) {
      return res.status(200).json({
        success: true,
        msg: "Congrats! The slot is available. Book it now",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

// get number of appointments per user controller
const getNoOfAppointmentsPerUserController = async (req, res) => {
  try {
    const { userId } = req.params;
    const appointments = await Appointment.countDocuments({ user: userId });

    if (appointments == 0) {
      return res.status(200).json({
        success: true,
        msg: "No appointments for this service provider",
        noOfAppointments: 0,
      });
    }

    if (appointments > 0) {
      return res.status(200).json({
        success: true,
        msg: "No of appointments for this service provider fetched successfully",
        noOfAppointments: appointments,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

// book appointment for walk in clients - service provider
const bookApponitmentForWalkinClientsController = async (req, res) => {
  try {
    const { username } = req.params;

    const {
      service,
      fee,
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
    } = req.body;

    // if service is not selected
    if (!service) {
      return res.status(401).json({
        succss: false,
        msg: "Please select the service",
      });
    }

    // if fee is not selected
    if (!fee) {
      return res.status(401).json({
        succss: false,
        msg: "Please provide the fee",
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

    // checking for existig client for unique ID
    const client = await User.findOne({ contactNo });
    console.log(client.userID);

    const serviceProvider = await User.findOne({ username });

    // if all the information is provided
    const newAppointment = new Appointment({
      appointmentID: await generateUniqueAppointmentID(),
      service: service.split(" ")[0],
      invoiceID: await generateUniqueInvoiceID(),
      patientID: client ? client.userID : await generateUniqueUserID(),
      fee,
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
      user: serviceProvider._id,
    });

    const result = await newAppointment.save();

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
      serviceProvider.businessName,
      service,
      date,
      time
    );

    return res.status(201).json({
      success: true,
      msg: "Appointment booked successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
      err: err.message,
    });
  }
};

const changeAppointmentStausController = async (req, res) => {
  try {
    const { appId } = req.params;
    const { appointmentStatus, rejectReason } = req.body;

    if (!appId) {
      return res.status(400).json({
        success: false,
        msg: "No appointment ID",
      });
    }

    if (!appointmentStatus) {
      return res.status(400).json({
        success: false,
        msg: "No appointment status",
      });
    }

    if (!rejectReason) {
      return res.status(400).json({
        success: false,
        msg: "No rejection reason",
      });
    }

    const appointment = await Appointment.findOneAndUpdate(
      { _id: appId },
      {
        status: appointmentStatus,
        rejectReason,
      },
      { new: true }
    );

    if (!appointment) {
      return res.status(409).json({
        success: false,
        msg: "Something went wrong. Please try again",
      });
    }

    return res.status(201).json({
      success: true,
      msg: "Appointment status changes successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

module.exports = {
  // bookAppointmnentController,
  bookAppointmnentByLoginController,
  getAllAppointmentsController,
  getTodayAppointmentsByUsernameController,
  getTotalAppointmentsCountController,
  getTodayTotalAppointmentsCountController,
  getTodayAppointmentsCountByUsernameController,
  getTotalAppointmentsCountByUsernameController,
  getAParticaularApponitmentDetails,
  getTotalAppointmentsCountByUserForClientIdController,
  getAllAppointmentsControllerForClient,
  checkAppointmentAvailability,
  getNoOfAppointmentsPerUserController,
  bookApponitmentForWalkinClientsController,
  changeAppointmentStausController,
};
