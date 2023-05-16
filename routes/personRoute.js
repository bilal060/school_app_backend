const express = require('express')
const { createPerson,getAllPerson,updateperson,deleteperson } = require('../Controller/newPerson');
const PersonRoute = express.Router()

PersonRoute.post('/person',createPerson);
PersonRoute.get('/person',getAllPerson);
PersonRoute.get('/person/:id',updateperson);
PersonRoute.patch('/person/:id',deleteperson);
// Alertrouter.delete('/Alerts/:id',deleteAlert);

module.exports =PersonRoute;     