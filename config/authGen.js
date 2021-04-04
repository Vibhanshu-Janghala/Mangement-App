const authGen  = async(req,res)=>{
    //create both token if credentials valid
    const tempUser = User.findOne({email:req.body.email});
    if(tempUser == null ){
        //user does not exists
        res.send()
    }
    else{
        //correct password
        if(bcrypt.compareSync(req.body.password,tempUser.password)){
            let payload = {mail:tempUser.email,lvl:tempUser.lvl,name:tempUser.name}
            let accessToken = jwt.sign(payload,ACCESS_TOKEN_KEY)
            let refreshToken = jwt.sign({mail: tempUser.email},REFRESH_TOKEN_KEY + date.getDate(),{signed:true})
            res.cookie("refreshT", refreshToken, {secure: true, httpOnly: true})
            res.send(accessToken);
        }
        //password incorrect
        else{
            //incorrect password message
        res.send()
        }
    }
}
module.exports = authGen;