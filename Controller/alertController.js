const { findByIdAndRemove, findById, findOne } = require("../Model/User");
const Alert = require("../Model/alert");

const CreateAlert = async (req, res) => {
  try {
    const { Alert, Location, AlertReason, AlertPrority } = req.body;
    // Alert = Alert.trim();
    // Location = Location.trim();
    // AlertReason = AlertReason.trim();
    // AlertPrority = AlertPrority.trim();
    // if (
    //   !(
    //     Alert ||
    //     Location ||
    //     AlertReason ||
    //     AlertPrority 
    //   )
    // ) {
    //   return res.status(500).json({
    //     message: "Internal server Error",
    //   });
    // }
    const newAlert = new Alert({
      Alert,
      Location,
      AlertReason,
      AlertPrority,
      // Set default values for createDate and createTime fields
    });
    const savedAlert = await newAlert.save();
    if (!savedAlert) {
      return res.status(500).json({
        message: "user Error",
      });
    }
    return res.status(201).json({
      savedAlert: savedAlert,
    });
  } catch (err) {
    throw err;
  }
};

const getStudennts = async (req, res) => {
  try {
    const Alerts = await Alert.find();
    res.json(Alerts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get Alerts" });
  }
};

const getAlert = async (req, res) => {
  try {
    const Alert = await Alert.findById(req.params.id);
    if (!Alert) {
      return res.status(404).send();
    }
    res.send(Alert);
  } catch (err) {
    res.status(500).send(err);
  }
};
const updateAlert = async (req, res) => {
  try {
    const Alert = await Alert.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!Alert) {
      return res.status(404).send();
    }
    res.send(Alert);
  } catch (err) {
    res.status(500).send(err);
  }
};
const deleteAlert = async (req, res) => {
  try {
    const Alert = await Alert.findByIdAndDelete(req.params.id);
    if (!Alert) {
      return res.status(404).send();
    }
    res.status(200).json({
      message: "record deleted succesfully",
      Alert: Alert,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.CreateAlert = CreateAlert;
exports.getStudennts = getStudennts;
exports.getAlert = getAlert;
exports.updateAlert = updateAlert;
exports.deleteAlert = deleteAlert;
