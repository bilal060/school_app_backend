const jwt = require('jsonwebtoken')
const env = require('dotenv').config()
const {TOKEN_KEY } = process.env


const verifyToken =  async(req , res , next )=>{
    const token = req.body.token ||req.query.token || req.header ["X-access-token"]
    if(!token){
        res.status(403).send(' an authentication token is required !')
    }
    try {
        const decodeToken = await jwt.verify(token,TOKEN_KEY)
        req.currentUser = decodeToken
        
    } catch (error) {
        
        res.status(401).send('invalid token provider')
    }
    return next();
}


module.exports = verifyToken