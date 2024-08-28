const express = require("express");
const colors = require("colors");
const app = express();
const PORT = 8080;

app.listen(PORT, () =>
  console.log(`${colors.bgMagenta(`The app is running on port ${PORT}`)}`)
);
