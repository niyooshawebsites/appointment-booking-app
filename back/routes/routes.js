const router = require("express").Router();

const {
  registerController,
  loginController,
  userVerficationController,
  checkAuthController,
  logoutController,
  updateContactDetailsController,
  updateAboutDetailsController,
  getAboutDetailsController,
  checkUserController,
  checkUserController,
} = require("../controllers/user.controller");

const {
  updateServiceController,
  deleteServiceController,
} = require("../controllers/service.controller");

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

// udpate service route
router.patch("/update-service", requrieLogin, isAdmin, updateServiceController);

// delete service route
router.delete(
  "/delete-service:id",
  requrieLogin,
  isAdmin,
  deleteServiceController
);

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

// logout route
router.post("/logout", logoutController);

// update contact details route
router.patch(
  "/update-contact-details",
  requrieLogin,
  isAdmin,
  updateContactDetailsController
);

// update about details route
router.patch(
  "/update-about-details",
  requrieLogin,
  isAdmin,
  updateAboutDetailsController
);

// get about details route
router.get("/about/:username", getAboutDetailsController);

router.get("/contact/:username", getContactDetailsController);

// check user route
router.get("/checkUser/:username", checkUserController);

module.exports = router;
