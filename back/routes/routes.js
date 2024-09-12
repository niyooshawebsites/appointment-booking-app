const router = require("express").Router();
const {
  registerController,
  loginController,
} = require("../controllers/user.controller");
const {
  bookAppointmnentController,
  getAllAppointmentsController,
} = require("../controllers/appointment.controller");
const isAdmin = require("../middlewares/isAdmin.middleware");
const requrieLogin = require("../middlewares/requireLogin.middleware");

// register route
router.post("/register", registerController);

// login route
router.post("/login", loginController);

// book appointment route
router.post("/book-appointment", bookAppointmnentController);

// fetch all appointments route
router.get(
  "/get-all-appointments",
  requrieLogin,
  isAdmin,
  getAllAppointmentsController
);

module.exports = router;
