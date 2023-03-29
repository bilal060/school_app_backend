const express = require('express')
const { CreateAlert,getStudennts,getAlert,updateAlert,deleteAlert } = require('../Controller/alertController');
const Alertrouter = express.Router()

Alertrouter.post('/Alerts',CreateAlert);
Alertrouter.get('/Alerts',getStudennts);
Alertrouter.get('/Alerts/:id',getAlert);
Alertrouter.patch('/Alerts/:id',updateAlert);
Alertrouter.delete('/Alerts/:id',deleteAlert);

module.exports =Alertrouter;