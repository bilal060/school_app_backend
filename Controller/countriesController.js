var worldMapData = require('city-state-country');


const getAllContries = async (req,res)=>{
    try{
    const { country, city , q } = req.query;
     const countriesList = worldMapData.getAllCountries();
    if(req.query.country){
        const statesList = worldMapData.getAllStatesFromCountry(country);
        res.status(200).json({
            statesList
        }) 
    }
    else if(req.query.city){
        const citiesList = worldMapData.getAllCitiesFromState(city);
        res.status(200).json({
            citiesList
        }) 
    }
    else if(req.query.q){
        const countriesList = worldMapData.searchCountry(q);
        res.status(200).json({
            countriesList
        }) 
    }else{
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

