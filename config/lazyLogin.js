const User = require("../models/users");
const jwt = require('jsonwebtoken');

// No auth present check for Refresh
// Imperfect Logic Component
// Fix after project completion
 const lazyLogin = async (req,res)=> {
    try {
        const decodedToken = await jwt.verify(req.signedCookies.refreshToken,
           process.env.REFRESH_TOKEN_KEY );


        let tempUser = await User.findOne({name: decodedToken.name}).exec();
        if(tempUser.refreshToken === req.signedCookies.refreshToken) {
            let accessToken = await jwt.sign(decodedToken,process.env.ACCESS_TOKEN_KEY);
            let userData = {
                authToken: accessToken,
                name: tempUser.name,
                level: tempUser.level,
                tdl: tempUser.tdl
            }
            res.status(200).send(userData);
        }
        else{
            res.status(400).send("Invalid Token");
            console.log("Deleted by signing out");
        }

    }

     catch(e){
        if(e.name === "TokenExpiredError"){

            const decodedToken = await jwt.verify(req.signedCookies.refreshToken,
               process.env.REFRESH_TOKEN_KEY ,{ignoreExpiration:true});

            let tempUser = await User.findOne({name: decodedToken.name}).exec();

            if(tempUser.refreshToken === req.signedCookies.refreshToken) {
                let accessToken = await jwt.sign(decodedToken, process.env.ACCESS_TOKEN_SECRET);
                let refreshToken = jwt.sign({name: tempUser.name},
                    process.env.REFRESH_TOKEN_KEY,{ expiresIn: '24h' });
                res.cookie("refreshToken", refreshToken, {secure: true, httpOnly: true, signed:true});
                let userData = {
                    authToken: accessToken,
                    name: tempUser.name,
                    level: tempUser.level,
                    tdl: tempUser.tdl
                }
                res.status(200).send(userData);

        }
        }
        else {
            res.status(400).send("Invalid Token");
            console.log("Error :" + e);
        }
     }
 }
 module.exports= lazyLogin;