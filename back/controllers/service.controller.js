const User = require("../models/user.model");

const updateServiceController = async (req, res) => {
  try {
    const { serviceId, serviceName, fee } = req.body;

    // if service is not provided
    if (!serviceId) {
      return res.status(400).json({
        success: false,
        msg: "Service ID is required",
      });
    }

    if (!serviceName) {
      return res.status(400).json({
        success: false,
        msg: "Service name is required",
      });
    }

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
      { username: req.user.username },
      { services: [...user.services, { serviceId, serviceName, fee }] },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      msg: "Service updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

const deleteServiceController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ username: req.user.username });

    const userServices = user.services.filter(
      (service) => service.serviceId != id
    );

    await User.findOneAndUpdate(
      { username: req.user.username },
      { services: userServices },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      msg: "Service deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

const getAllServicesController = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "No user found",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "user and services found",
      services: user.services,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

module.exports = {
  updateServiceController,
  deleteServiceController,
  getAllServicesController,
};
