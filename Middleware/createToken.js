const jwt = require('jsonwebtoken')
const env = require('dotenv').config()
const {TOKEN_KEY , TOKEN_EXPIRY} = process.env
const createToken = async (tokenData,tokenKey =TOKEN_KEY ,tokenExpiry =TOKEN_EXPIRY )=>{
try {
    const token = jwt.sign(tokenData,tokenKey ,{
        expiresIn: tokenExpiry
    })
    return token
} catch (error) {
    
    throw error
}



}

module.exports = createToken