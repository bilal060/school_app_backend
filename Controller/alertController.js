const { findByIdAndRemove, findById, findOne } = require("../Model/User");
const Alerts = require("../Model/alert");
const moment = require("moment");
const catchAsync = require("../utils/catchAsync");

const CreateAlert = catchAsync(async (req, res) => {
  let { Alert, Location, AlertReason, AlertPrority } = req.body;
  if (Alert  && Location && AlertReason && AlertPrority) {
    Alert = Alert.trim();
    Location = Location.trim();
    AlertReason = AlertReason.trim();
    AlertPrority = AlertPrority.trim();
  }else{
    return res.status(400).json({
      message: "please enter All values ",
    });
  }
  const newDoc = new Alerts({
    Alert,
    Location,
    AlertReason,
    AlertPrority,
  });
  newDoc.save()
  if (!newDoc) {
    return res.status(500).json({
      message: "user Error",
    });
  }
  return res.status(201).json({
    savedAlert: newDoc,
  });
});

const getAlerts = catchAsync( async (req, res) => {
    const AllAlerts = await Alerts.find();
    res.status(200).json(AllAlerts);
    if(!AllAlerts){
      res.status(400).json({ error: "Failed to get Alerts" });
    }
});

const getAlert =catchAsync( async (req, res) => {
   let Alert;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
     Alert =await Alerts.findById(req.params.id);
  }else{
    return res.status(404).send('Id not Valid');
  }
    if (!Alert) {
      return res.status(404).send();
    }
    res.send(Alert);
});
const updateAlert =catchAsync( async (req, res) => {
    const Alert = await Alerts.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!Alert) {
      return res.status(404).send();
    }
    res.status(201).send(Alert);
  }
);
const deleteAlert = catchAsync(async (req, res) => {
    const Alert = await Alerts.findByIdAndDelete(req.params.id);
    if (!Alert) {
      return res.status(404).send();
    }
    res.status(200).json({
      message: "record deleted succesfully",
      Alert: Alert,
    });

});

exports.CreateAlert = CreateAlert;
exports.getAlerts = getAlerts;
exports.getAlert = getAlert;
exports.updateAlert = updateAlert;
exports.deleteAlert = deleteAlert;
