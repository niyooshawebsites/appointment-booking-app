const router = require("express").Router();
const {
  registerController,
  loginController,
  userVerficationController,
  checkAuthController,
  logoutController,
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

// verfiy email route
router.put("/verify-email/:token", userVerficationController);

// book appointment route
router.post("/book-appointment", bookAppointmnentController);

// fetch all appointments route
router.get(
  "/get-all-appointments",
  requrieLogin,
  isAdmin,
  getAllAppointmentsController
);

// check authentication
router.get("/check-auth", requrieLogin, checkAuthController);

// logout controller
router.post("/logout", logoutController);

module.exports = router;
