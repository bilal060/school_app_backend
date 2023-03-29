const express = require('express')
const { CreateAlert,getAlerts,getAlert,updateAlert,deleteAlert } = require('../Controller/alertController');
const Alertrouter = express.Router()

Alertrouter.post('/Alerts',CreateAlert);
Alertrouter.get('/Alerts',getAlerts);
Alertrouter.get('/Alerts/:id',getAlert);
Alertrouter.patch('/Alerts/:id',updateAlert);
Alertrouter.delete('/Alerts/:id',deleteAlert);

module.exports =Alertrouter;