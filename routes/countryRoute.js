const {getAllContries,getAllCities,getAllState} = require('../Controller/countriesController')

const express = require('express')
const countryRouter = express.Router()
countryRouter.get('/country',getAllContries) 

module.exports = countryRouter;