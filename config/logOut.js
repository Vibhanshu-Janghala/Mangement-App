const User = require("../models/users");

const logOut = async (req,res)=>{
    let data = req.get("Authorization");
    try {
        await User.findOneAndUpdate({name: data.name}, {refreshToken: ""}).exec();
        res.status(200).clearCookie("refreshToken",
							{httpOnly: true, signed: true}).send();
    }
    catch(e){
        res.status(500).send("Error occured while logging out")
    }
}

module.exports = logOut;