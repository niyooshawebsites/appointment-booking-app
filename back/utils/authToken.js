const jwt = require("jsonwebtoken");

const generateAuthToken = async (userDetails) => {
  const authToken = await jwt.sign(userDetails, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return authToken;
};

module.exports = generateAuthToken;
