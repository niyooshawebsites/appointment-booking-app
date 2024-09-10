const router = require("express").Router();
const { registerController } = require("../controllers/user.controller");
const appointmnentController = require("../controllers/appointment.controller");

// signup route
router.post("/register", registerController);

// book appointment route
router.post("/book-appointment", appointmnentController);

module.exports = router;
