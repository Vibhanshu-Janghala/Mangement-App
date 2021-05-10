const User = require("../models/users");

const signOut = async (req,res)=>{
    let data = req.get("Authorization");
    try {
        await User.findOneAndUpdate({name: data.name}, {refreshToken: ""}).exec();
        res.status(200).send("Successful");
    }
    catch(e){
        res.status(500).send("Some error occurred")
    }
}

export default signOut;