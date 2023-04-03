
const jwt = require("jsonwebtoken");
const env = require("dotenv").config(); 
const process = require('process');
const { TOKEN_KEY } = process.env;
const validateToken = async (req, res, next) => {
  let token;
  let authHeader =await  req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token,TOKEN_KEY, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      console.log(decoded)
      req.user = decoded.userAvailable;
      next();
    });

    if (!token) {
      res.status(401);
      throw new Error("User is not authorized or token is missing");
    }
  }
};

module.exports = validateToken;