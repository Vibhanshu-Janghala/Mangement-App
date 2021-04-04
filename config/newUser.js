
const registerNewUser = async (req, res) => {
   //check(by email) if user already exists
    if( await User.exists({ email: req.body.email })){res.sendStatus(409);}
    const hashPass = bcrypt.hashSync(req.body.password,7);
            let newUser = await new User({name:req.body.name,
                                    password:hashPass,
                                    level:req.body.level,
                                    email:req.body.email
            })
    newUser.save().then(()=>{console.log("User Added")}).catch((err)=>
        (console.log("User cant be added.Error :-"+err)));
           // THIS IS A MIDDLEWARE FOR LOGIN
            //after this pass param to login for auth and refresh token
}
module.exports = registerNewUser ;
