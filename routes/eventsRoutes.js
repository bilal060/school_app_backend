const express = require('express');
const {CreateEvent,getEvents,getEvent,updateEvent,deleteEvent } = require('../Controller/events.Controller');
const eventRouter = express.Router();


eventRouter.post('/events',CreateEvent);
eventRouter.get('/events',getEvents);
eventRouter.get('/events/:id',getEvent);
 eventRouter.patch('/events/:id',updateEvent);
 eventRouter.delete('/events/:id',deleteEvent);






module.exports =eventRouter;