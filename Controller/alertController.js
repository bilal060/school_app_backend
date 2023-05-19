const { findByIdAndRemove, findById, findOne } = require("../Model/User");
const Alerts = require("../Model/alert");
const moment = require("moment");
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

const CreateAlert =catchAsync( async (req, res ,next) => {
  let { Alert, Location, AlertReason, AlertPrority }  =
  req.body;
const newDoc = await Alerts.create({
  Alert,
    Location,
    AlertReason,
    AlertPrority,
});
if (!newDoc) {
  return  next(new AppError('somting Wrong', 400));
}
return res.status(201).json({
  savedAlert: newDoc,
});

});
//   const { Alert, Location, AlertReason, AlertPrority } = req.body;
//   const newDoc = new Alerts({
//     Alert,
//     Location,
//     AlertReason,
//     AlertPrority,
//   });
//   newDoc.save()
//   if (!newDoc) {
//     return  next(new AppError('Somting wrong', 400));
//   }
//   return res.status(201).json({
//     savedAlert: newDoc,
//   });
// });

const getAlerts = catchAsync( async (req, res,next) => {
    const AllAlerts = await Alerts.find();
    res.status(200).json(AllAlerts);
    if(!AllAlerts){
      return  next(new AppError('Failed to get Alerts', 400));
    }
});

const getAlert =catchAsync( async (req, res,next) => {
    const Alert =await Alerts.findById(req.params.id);
    if (!Alert) {
      return  next(new AppError('not found Alerts', 404));
    }
    res.send(Alert);
});
const updateAlert =catchAsync( async (req, res,next) => {
    const Alert = await Alerts.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });;
    if (!Alert) {
      return  next(new AppError('not found Alerts', 404));
    }
    res.status(200).send(Alert);
  }
);
const deleteAlert = catchAsync(async (req, res,next) => {
    const Alert = await Alerts.findByIdAndDelete(req.params.id);
    if (!Alert) {
      return  next(new AppError('not found Alerts', 404));
    }
    res.status(200).json({
      message: "record deleted succesfully",
    });

});

exports.CreateAlert = CreateAlert;
exports.getAlerts = getAlerts;
exports.getAlert = getAlert;
exports.updateAlert = updateAlert;
exports.deleteAlert = deleteAlert;
