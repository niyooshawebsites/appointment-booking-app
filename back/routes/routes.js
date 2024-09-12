const router = require("express").Router();
const {
  registerController,
  loginController,
} = require("../controllers/user.controller");
const {
  bookAppointmnentController,
  getAllAppointmentsController,
} = require("../controllers/appointment.controller");

// register route
router.post("/register", registerController);

// login route
router.post("/login", loginController);

// book appointment route
router.post("/book-appointment", bookAppointmnentController);

// fetch all appointments route
router.get("/get-all-appointments", getAllAppointmentsController);

module.exports = router;
