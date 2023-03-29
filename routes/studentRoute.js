const express = require('express')
const { CreateStudent,getStudennts,getStudent,updateStudent,deleteStudent } = require('../Controller/studentController');
const Studentrouter = express.Router()

Studentrouter.post('/students',CreateStudent);
Studentrouter.get('/students',getStudennts);
Studentrouter.get('/students/:id',getStudent);
Studentrouter.patch('/students/:id',updateStudent);
Studentrouter.delete('/students/:id',deleteStudent);

module.exports =Studentrouter;