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
  deleteUserController,
  getUsersByDateController,
  getTotalUsersCountController,
  getTotalVerifiedUsersCountController,
  getTotalUnverifiedUsersCountController,
  getTodayTotalUsersCountController,
  getTodayTotalVerifiedUsersCountController,
  getTodayTotalUnverifiedUsersCountController,
  getAllVerifiedUsersController,
  getAllUnverifiedUsersController,
  getTodayVerifiedUsersController,
  getTodayUnverifiedUsersController,
  getAllUsersBySpecificSpecializationController,
  updateClientDetailsController,
  getParticularClientDataByUserIdController,
} = require("../controllers/user.controller");

const {
  updateServiceController,
  deleteServiceController,
  getAllServicesController,
} = require("../controllers/service.controller");

const {
  bookAppointmnentController,
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

// book appointment route - without login
router.post("/book-appointment/:username", bookAppointmnentController);

// book appointment route - by login - for client
router.post(
  "/book-appointment-by-login/:username",
  auth,
  bookAppointmnentByLoginController
);

// fetch all appointments by userId route
router.get(
  "/get-all-appointments-by-userId/:userId",
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

// get all verified users route
router.get(
  "/get-all-verified-users/:userId",
  auth,
  isAdmin,
  getAllVerifiedUsersController
);

// get all unverified users route
router.get(
  "/get-all-unverified-users",
  auth,
  isAdmin,
  getAllUnverifiedUsersController
);

// delete user route
router.delete("/delete-user/:id", auth, isAdmin, deleteUserController);

// today's appointment by userId route
router.get(
  "/get-today-appointments-by-userId/:userId",
  auth,
  isServiceProvider,
  getTodayAppointmentsByUsernameController
);

// today's users route
router.get("/get-today-users", auth, isAdmin, getUsersByDateController);

// today's verified users route
router.get(
  "/get-today-verified-users",
  auth,
  isAdmin,
  getTodayVerifiedUsersController
);

// today's unverified users route
router.get(
  "/get-today-unverified-users",
  auth,
  isAdmin,
  getTodayUnverifiedUsersController
);

// get total users count route - for admin
router.get(
  "/get-total-users-count/:userId",
  auth,
  isAdmin,
  getTotalUsersCountController
);

// get total verified users count route - for admin
router.get(
  "/get-total-verified-users-count/:userId",
  auth,
  isAdmin,
  getTotalVerifiedUsersCountController
);

// get total unverfied users count route - for admin
router.get(
  "/get-total-unverified-users-count/:userId",
  auth,
  isAdmin,
  getTotalUnverifiedUsersCountController
);

// get total appointments count route - for admin
router.get(
  "/get-total-appointments-count",
  auth,
  isAdmin,
  getTotalAppointmentsCountController
);

// get total appointments count - filter by username route
router.get(
  "/fetch-total-appointments-count/:userId",
  auth,
  isServiceProvider,
  getTotalAppointmentsCountByUsernameController
);

// get today's appointments count - filter by username route - for service provider
router.get(
  "/today-appointments-count/:userId",
  auth,
  isServiceProvider,
  getTodayAppointmentsCountByUsernameController
);

// get today total users count route
router.get(
  "/get-today-total-users-count",
  auth,
  isAdmin,
  getTodayTotalUsersCountController
);

// get today total verified users count route
router.get(
  "/get-today-total-verified-users-count",
  auth,
  isAdmin,
  getTodayTotalVerifiedUsersCountController
);

// get today total unverified users count route
router.get(
  "/get-today-total-unverified-users-count",
  auth,
  isAdmin,
  getTodayTotalUnverifiedUsersCountController
);

// get today's total appointments count route
router.get(
  "/get-today-total-appointments-count",
  auth,
  isAdmin,
  getTodayTotalAppointmentsCountController
);

// get details about a particular route - for service provider
router.get(
  "/get-a-particular-appointment-details/:appointmentId",
  auth,
  isServiceProvider,
  getAParticaularApponitmentDetails
);

// get total appointments count - filter by userId route - for client
router.get(
  "/get-total-appointments-count-by-userId-for-client/:email",
  auth,
  getTotalAppointmentsCountByUserForClientIdController
);

// get all appointments - filter by userId for a particular client
router.get(
  "/get-all-appointments-for-client/:email",
  auth,
  getAllAppointmentsControllerForClient
);

// get all users by specific specialization
router.get(
  "/get-all-users-by-specific-specialization/:specialization",
  auth,
  getAllUsersBySpecificSpecializationController
);

// update client details
router.patch(
  "/update-client-details/:userId",
  auth,
  updateClientDetailsController
);

// get data related to particular client route -  client
router.get(
  "/get-particular-client-data-by-userId/:userId",
  auth,
  getParticularClientDataByUserIdController
);

// get the check appointment route
router.get("/check-appointment-availability", checkAppointmentAvailability);

// get number of appointments per user - admin
router.get(
  "/get-no-of-appointments-per-user/:userId",
  auth,
  isAdmin,
  getNoOfAppointmentsPerUserController
);

module.exports = router;
