const jwt = require("jsonwebtoken");

const generateAuthToken = async (userDetails, expiry) => {
  const authToken = await jwt.sign(userDetails, process.env.JWT_SECRET, {
    expiresIn: expiry,
  });
  return authToken;
};

module.exports = generateAuthToken;
