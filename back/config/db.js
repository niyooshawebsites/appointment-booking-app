const mongoose = require("mongoose");
const colors = require("colors");

const connection = async () => {
  try {
    const connectDB = await mongoose.connect(`${process.env.MONGODB_URI}`);
    connectDB
      ? console.log(`${colors.bgMagenta(`Successfully connected to DB`)}`)
      : console.log(`${colors.bgRed(`DB connection failed`)}`);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = connection;
