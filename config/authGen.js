const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authGen  = (req,res)=>{
    //create both token if credentials valid
    const tempUser = User.findOne({email:req.body.email});
    if(tempUser === null ){
        // User does not exists
        res.status(401).send("Username not found");
    }
    else{
        // Correct Password
        if(bcrypt.compareSync(req.body.password,tempUser.password)){
            let payload = {mail:tempUser.email,lvl:tempUser.lvl,name:tempUser.name};
            let accessToken = jwt.sign(payload,ACCESS_TOKEN_KEY);
            let refreshToken = jwt.sign({mail: tempUser.email},
                    REFRESH_TOKEN_KEY + new Date().getDate(),{signed:true});
            res.cookie("refreshT", refreshToken, {secure: true, httpOnly: true});
            res.status(200).send(accessToken);
        }
        // Incorrect Password
        else{
            res.status(401).send("Incorrect Password");
        }
    }
}
module.exports = authGen;