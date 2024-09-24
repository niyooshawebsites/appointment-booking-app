const User = require("../models/user.model");

const updateServiceController = async (req, res) => {
  try {
    const { serviceId, service, fee } = req.body;

    // if service is not provided
    if (!service) {
      return res.status(400).json({
        success: false,
        msg: "Service is required",
      });
    }

    // if fee is not provided
    if (!fee) {
      return res.status(400).json({
        success: false,
        msg: "Fee is required",
      });
    }

    const user = await User.findOne({ username: req.user.username });

    if (!user) {
      return res.status(404).json({
        success: true,
        msg: "user not found",
      });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: req.user.email },
      { serviceId, service, fee },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      msg: "Service updated successfully",
    });
  } catch {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

const deleteServiceController = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ email: req.user.email });
    const userServices = user.services.filter(
      (service) => service.serviceId !== id
    );

    user.services = userServices;
    await user.save();

    return res.status(200).json({
      success: true,
      msg: "Service deleted successfully",
    });
  } catch {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

module.exports = { updateServiceController, deleteServiceController };
