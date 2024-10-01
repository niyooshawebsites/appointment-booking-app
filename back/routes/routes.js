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
  getContactDetailsController,
  checkUserController,
  updateSocialProfilesController,
  updatePasswordController,
  forgotPasswordController,
  resetPasswordController,
  getAllUsersController,
} = require("../controllers/user.controller");

const {
  updateServiceController,
  deleteServiceController,
  getAllServicesController,
} = require("../controllers/service.controller");

const {
  bookAppointmnentController,
  getAllAppointmentsController,
} = require("../controllers/appointment.controller");

const isServiceProvider = require("../middlewares/isServiceProvider.middleware");
const auth = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/isAdmin.middleware");

// register route
router.post("/register", registerController);

// login route
router.post("/login", loginController);

// verfiy email route
router.put("/verify-email/:token", userVerficationController);

// udpate service route
router.patch(
  "/update-service",
  auth,
  isServiceProvider,
  updateServiceController
);

// delete service route
router.patch(
  "/delete-service/:id",
  auth,
  isServiceProvider,
  deleteServiceController
);

// get all services routes
router.get("/get-services/:username", getAllServicesController);

// book appointment route
router.post("/book-appointment", bookAppointmnentController);

// fetch all appointments route
router.get(
  "/get-all-appointments/:username",
  auth,
  isServiceProvider,
  getAllAppointmentsController
);

// check authentication
router.get("/check-auth", auth, checkAuthController);

// logout route
router.post("/logout", logoutController);

// update contact details route
router.patch(
  "/update-contact-details",
  auth,
  isServiceProvider,
  updateContactDetailsController
);

// update about details route
router.patch(
  "/update-about-details",
  auth,
  isServiceProvider,
  updateAboutDetailsController
);

// update social media routes
router.patch(
  "/update-social-profiles",
  auth,
  isServiceProvider,
  updateSocialProfilesController
);

// udpate password route
router.patch(
  "/update-password",
  auth,
  isServiceProvider,
  updatePasswordController
);

// reset password route
router.patch("/reset-password/:token", resetPasswordController);

// get about details route
router.get("/about/:username", getAboutDetailsController);

// get contact us details route
router.get("/contact/:username", getContactDetailsController);

// check user route
router.get("/checkUser/:username", checkUserController);

// forgot-password-route
router.get("/reset-password/:email", forgotPasswordController);

// get all users route
router.get("/get-all-users", auth, isAdmin, getAllUsersController);

module.exports = router;
