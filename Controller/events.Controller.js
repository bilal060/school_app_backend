const Event = require("../Model/events");
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

const CreateEvent = catchAsync(async (req, res) => {

    const {
      name,
      date,
      time
    } = req.body;

    const newEvent = new Event({
      name: name,
      date: new Date(date),
      time: {
        start: time.start,
        end: time.end,
      },
    });
    await newEvent.save();
    res.status(201).json(newEvent);

});


const getEvents = async (req, res) => {
    try {
      const AllEvent = await Event.find();
      res.status(200).json({
        status: 'success',
        results: AllEvent.length,
        data: {
            AllEvent
        }
    
      })
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to get Alerts" });
    }
  };


  const getEvent = async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).json({
            message:"record not found"
        });
      }
      res.status(200).json({
        status: 'success',
        results: event.length,
        data: {
            event
        }
    
      });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const updateEvent = async (req, res) => {
    try {
      const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!event) {
        return res.status(404).send();
      }
      res.status(200).json({
        status: 'success',
        results: event.length,
        data: {
            event
        }
    
      });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const deleteEvent= async (req, res) => {
    try {
      const event = await Event.findByIdAndDelete(req.params.id);
      if (!event) {
        return res.status(404).send();
      }
      res.status(200).json({
        message: "record deleted succesfully",
        event: event,
      });
    } catch (err) {
      res.status(500).send(err);
    }
  };


exports.CreateEvent = CreateEvent;
exports.getEvents = getEvents;
exports.getEvent = getEvent;
exports.updateEvent = updateEvent;
exports.deleteEvent = deleteEvent;
