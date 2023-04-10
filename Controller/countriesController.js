var worldMapData = require('city-state-country');


const getAllContries = async (req,res)=>{
    try{
    const { country, state , q } = req.query;
     const countriesList = worldMapData.getAllCountries();
    if(req.query.country){
        //get All states
        const statesList = worldMapData.getAllStatesFromCountry(country);
        res.status(200).json({
            statesList
        }) 
    }
    else if(req.query.state){
        const citiesList = worldMapData.getAllCitiesFromState(state);
        res.status(200).json({
            citiesList
        }) 
    }
    else if(req.query.city){
        const citiesList = worldMapData.getAllCitiesFromState(city);
        res.status(200).json({
            citiesList
        }) 
    }
 else{
        res.status(200).json({
            countriesList
        }) 
    }
 
}catch(err){
    res.status(400).json({
        err:err
    }) 
}
}




exports.getAllContries = getAllContries;

