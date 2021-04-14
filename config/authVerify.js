//middleware for authentication verification

const jwt = require("jsonwebtoken");
const User = require("../models/users");

const checkAccess = async (req, res, next)=> {
    const tempUser = await User.findOne({email:req.body.email}).exec() ;

    if(req.authToken != null){
        let tokData = await jwt.verify(req.authToken,ACCESS_TOKEN_KEY);
        if(req.user === tokData.name)
        {
            next();
        }
        else{
            res.status(401).send("Token verification failed");
        }

    }
    //no auth present check for refresh
    else if( await jwt.verify(req.signedCookies.refreshT,REFRESH_TOKEN_KEY) != null){

        let payload = {mail:tempUser.email,lvl:tempUser.lvl,name:tempUser.name}

        let accessToken = await jwt.sign(payload,ACCESS_TOKEN_KEY)
        res.status(200);
        res.authToken = accessToken;
        next();
   }
    else{
        res.status(401).send("Authorization failed");
    }
}
module.exports = checkAccess;