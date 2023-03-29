const { findByIdAndRemove, findById, findOne } = require("../Model/User");
const Alerts = require("../Model/alert");
const moment = require('moment');


const CreateAlert = async (req, res) => {
  try {
    let { Alert, Location, AlertReason, AlertPrority } = req.body;
    Alert = Alert.trim();
    Location = Location.trim();
    AlertReason = AlertReason.trim();
    AlertPrority = AlertPrority.trim();
    if (
      !(
        Alert ||
        Location ||
        AlertReason ||
        AlertPrority 
      )
    ) {
      return res.status(500).json({
        message: "Internal server Error",
      });
    }
    const newDoc = new Alerts({
      Alert,
      Location,
      AlertReason,
      AlertPrority,
    });
    newDoc.save()
    .then(doc => {
      console.log(doc); // the date without time
    })
    .catch(err => {
      console.error(err);
    });

    if (!newDoc) {
      return res.status(500).json({
        message: "user Error",
      });
    }

    return res.status(201).json({
      savedAlert: newDoc,
    });
  } catch (err) {
    throw err;
  }
};

const getAlerts = async (req, res) => {
  try {
    const AllAlerts = await Alerts.find();
    res.status(200).json(AllAlerts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get Alerts" });
  }
};

const getAlert = async (req, res) => {
  try {
    const Alert = await Alerts.findById(req.params.id);
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
    const Alert = await Alerts.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!Alert) {
      return res.status(404).send();
    }
    res.status(201).send(Alert);
  } catch (err) {
    res.status(500).send(err);
  }
};
const deleteAlert = async (req, res) => {
  try {
    const Alert = await Alerts.findByIdAndDelete(req.params.id);
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
exports.getAlerts = getAlerts;
exports.getAlert = getAlert;
exports.updateAlert = updateAlert;
exports.deleteAlert = deleteAlert;
