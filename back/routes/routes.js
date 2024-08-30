const { registerController } = require("../controllers/user.controller");
const router = require("express").Router();

// signup route
const registerRoute = router.post("/register", registerController);

module.exports = router;
