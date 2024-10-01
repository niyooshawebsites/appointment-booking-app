const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.cookies?.authToken;
  console.log("TOKEN");
  console.log(token);

  try {
    if (token) {
      await jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          return res.status(401).json({
            success: false,
            msg: "Token Error!",
          });
        }
        req.user = user;
        next();
      });
    }
  } catch (err) {
    return res.status(401).json({
      success: false,
      msg: "Token not found",
      err,
    });
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      msg: "No token. No access.",
    });
  }
};

module.exports = auth;
