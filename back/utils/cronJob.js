const cron = require("node-cron");
const User = require("../models/user.model");
const mongoose = require("mongoose");

// Schedule a cron job to run everyday at midnight
cron.schedule("0 0 * * *", async () => {
  const thresholdDate = new Date();
  //  Delete unverified users older than 1 day
  thresholdDate.setDate(thresholdDate.getDate() - 1);

  try {
    const res = await User.deleteMany({
      isVerified: false,
      createdAt: { $lt: thresholdDate },
    });
    console.log(`Deleted ${res.deletedCount} unverified user(s)`);
  } catch (err) {
    console.log(err);
  }
});

module.exports = cron;
