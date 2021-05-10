//middleware for authentication verification

const jwt = require("jsonwebtoken");
const User = require("../models/users");

const checkAccess = async (req, res, next)=> {

    let data = req.get("Authorization");

    if( data != null){
        try{
            let tokData = await jwt.verify(data.authToken,process.env.ACCESS_TOKEN_SECRET);
            next();
        }
        catch(e){
            res.status(401).send("Token verification failed");
            console.log(e);
        }

    }
    else{
        res.status(401).send("Authorization failed");
    }
}
module.exports = checkAccess;