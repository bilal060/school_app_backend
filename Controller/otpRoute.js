const {sentOTP,verifyOTP} = require('../Controller/otpController')

const express = require('express')
var worldMapData = require('city-state-country');


const otpRouter = express.Router()


otpRouter.post('/otp',sentOTP) 
otpRouter.post('/otpverify',verifyOTP)

otpRouter.get('/getCountries', async (req,res)=>{
    const { city } = req.query;
    const countriesList = worldMapData.getAllCountries();
    // const statesList = worldMapData.getAllStatesFromCountry(country);
    const citiesList = worldMapData.getAllCitiesFromState(city);


    res.status(200).json({
        citiesList
    }) 
})

module.exports = otpRouter;