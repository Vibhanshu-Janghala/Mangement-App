const bcrypt = require("bcrypt");
const User = require("../models/users");

const registerNewUser =  async(req,res,next) => {
   //check(by email) if user already exists
    if( await User.exists({ email: req.body.email })) {
            res.status(406).send("Already Exists");
    }
    else{
        const hashPass = bcrypt.hashSync(req.body.password,7);
            let newUser = new User({name:req.body.name,
                                    password:hashPass,
                                    level:req.body.level,
                                    email:req.body.email
            })
        await newUser.save().then(()=>{console.log("User Added")}).catch((err)=>
            (console.log("User cant be added.Error :-"+err)));
           // THIS IS A MIDDLEWARE FOR LOGIN
            //after this pass param to login for auth and refresh token
         next();
         }
    }
module.exports = registerNewUser ;
