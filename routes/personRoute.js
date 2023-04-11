const express = require('express')
const { createPerson } = require('../Controller/newPerson');
const PersonRoute = express.Router()

PersonRoute.post('/person',createPerson);
// Alertrouter.get('/Alerts',getAlerts);
// Alertrouter.get('/Alerts/:id',getAlert);
// Alertrouter.patch('/Alerts/:id',updateAlert);
// Alertrouter.delete('/Alerts/:id',deleteAlert);

module.exports =PersonRoute;