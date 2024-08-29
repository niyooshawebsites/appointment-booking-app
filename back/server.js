const express = require("express");
const colors = require("colors");
const connection = require("./config/db");
const app = express();
connection();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>
  console.log(`${colors.bgMagenta(`The app is running on port ${PORT}`)}`)
);
