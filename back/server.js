const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const connection = require("./config/db");
const apiRoutes = require("./routes/routes");
const app = express();

// configuration
dotenv.config({ path: "../.env" });
const PORT = process.env.PORT || 8080;

// start the connection
connection();

// middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan());
app.use(express.json());

// routes
app.use(process.env.API_VERSION, apiRoutes);

// PORT listening
app.listen(PORT, () =>
  console.log(`${colors.bgMagenta(`The app is running on port ${PORT}`)}`)
);
