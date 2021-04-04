//middleware for authentication verification

const checkAccess = (req,res)=> {
    const tempUser = User.findOne({email:req.body.email});

    if(req.authToken != null){
        let tokData = jwt.verify(req.authToken,ACCESS_TOKEN_KEY);
        if(req.user === tokData.name)
        {
            //access granted
        }
        else{
            //some error occurred
        }

    }
    //no auth present check for refresh
    else if(jwt.verify(req.signedCookies.refreshT,REFRESH_TOKEN_KEY) != null){

        let payload = {mail:tempUser.email,lvl:tempUser.lvl,name:tempUser.name}
        const tempUser = User.findOne({email:req.body.email});

        let accessToken = jwt.sign(payload,ACCESS_TOKEN_KEY)
        res.send(accessToken)
   }
    else{
        res.send("Access Denied")
    }
}
module.exports = checkAccess;