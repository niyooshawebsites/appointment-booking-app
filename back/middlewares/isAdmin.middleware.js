const isAdmin = async (req, res, next) => {
  try {
    const { role, isAdmin } = req.user;
    if (role === 1 && isAdmin === true) {
      return next();
    } else {
      return res.status(401).json({
        success: false,
        msg: "Only admin is allowed!",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = isAdmin;
