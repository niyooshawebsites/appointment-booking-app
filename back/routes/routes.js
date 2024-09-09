const { registerController } = require("../controllers/user.controller");
const appointmnentController = require("../controllers/appointment.controller");
const router = require("express").Router();

// signup route
const registerRoute = router.post("/register", registerController);

// book appointment route
const bookAppointmentRoute = router.post(
  "/book-appointment",
  appointmnentController
);

module.exports = router;
