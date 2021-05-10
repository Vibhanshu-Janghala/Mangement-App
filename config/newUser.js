const bcrypt = require("bcrypt");
const User = require("../models/users");

const registerNewUser =  async (req,res,next) => {
    console.log(req.body);
   //check(by email) if user already exists
    if( await User.exists({ name: req.body.name })) {
            res.status(406).send("Already Exists");
    }
    else{
        const hashPass = await bcrypt.hash(req.body.password,7);
            let newUser = new User({name:req.body.name,
                                    password:hashPass,
                                    level:req.body.level,
                                    email:req.body.email
            })
        try {
            await newUser.save();
            console.log("User Added");
            req.newUser = true ;
            // After this pass param to authGen for Auth and Refresh Token
            next();
            }
        catch(e){
                console.log("User can't be added. Error :-"+ e);
            }

         }
    }
module.exports = registerNewUser ;
