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
                let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY);
                let refreshToken = jwt.sign({name: tempUser.name},
                    process.env.REFRESH_TOKEN_KEY, {expiresIn: '24h'});
                res.cookie("refreshToken", refreshToken, {secure: true, httpOnly: true, signed: true});
                let userData = {
                    authToken: accessToken,
                    name: tempUser.name,
                    level: tempUser.level,
                    tdl: tempUser.tdl
                }
                const updateRefreshTok = await User.updateOne({name: tempUser.name},
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
        }
    }
}
module.exports = authGen;