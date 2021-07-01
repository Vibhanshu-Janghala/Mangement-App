const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authGen  = async (req,res)=>{
    //create both token if credentials valid
    const tempUser = await User.findOne({name:req.body.name});
    if(tempUser === null ){
        // User does not exists
        res.status(401).send("Username not found");
    }
    else{
        try{// Correct Password
            let proceedTokenGeneration = req.newUser ? true : await bcrypt.compareSync(req.body.password, tempUser.password);
            if (proceedTokenGeneration) {
                let payload = {level: tempUser.level, name: tempUser.name};
                let accessToken = jwt.sign(payload, ""+process.env.ACCESS_TOKEN_SECRET);
                let refreshToken = jwt.sign({name: tempUser.name},
                   ""+ process.env.REFRESH_TOKEN_SECRET);
                res.cookie("refreshToken", refreshToken,
                        {httpOnly: true, signed: true,
                            maxAge: (24*3600*1000) });
                let userData = {
                    authToken: accessToken,
                    name: tempUser.name,
                    level: tempUser.level,
                    tdl: tempUser.tdl
                }
                await User.updateOne({name: tempUser.name},
                    {refreshToken: refreshToken});
                res.status(200).send(userData);
            }
            // Incorrect Password
            else {
                res.status(401).send("Incorrect Password");
            }
        }
        catch (e) {
            console.log(e);
			res.status(500).send("Error while validating password");
        }
    }
}
module.exports = authGen;