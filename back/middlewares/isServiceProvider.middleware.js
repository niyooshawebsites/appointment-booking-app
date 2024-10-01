const isServiceProvider = async (req, res, next) => {
  try {
    const userDetails = req.user;

    // check if the userdetails are correct and is admin or not
    if (userDetails && userDetails.role === 1) {
      return next();
    } else {
      return res.status(401).json({
        success: false,
        msg: "Only service providers are allowed!",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = isServiceProvider;
