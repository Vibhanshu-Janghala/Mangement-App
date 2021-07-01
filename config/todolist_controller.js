const express = require("express");
const User = require("../models/users");
const router = express.Router();
//get todolist
router.get("/get", async (req, res) => {
    try {
        let data = JSON.parse( req.get("Authorization"));
        const userDoc = await User.findOne({name:data.name}).exec();
        res.status(200).send(userDoc.tdl)
    }
    catch (err) {
        console.log("Some Error occurred" + err);
        res.status(500).send("Some Error occurred" + err);
    }
})

//update an item

router.post("/add",async (req,res)=>{
    try{
        let data = JSON.parse(req.get("Authorization"));
        let updatedUser = await User.findOneAndUpdate({"name":data.name},
            { $push : { "tdl": {"title":req.body.title,"content":req.body.content} }}).exec();
        res.sendStatus(200);
    }
    catch (e){
        console.log("Error in post Announce" + e)
        res.status(500).send("Some Error occurred" + e);
    }
})

router.post("/delete",async (req,res)=>{
    try{
        let data = JSON.parse(req.get("Authorization"));

        let updatedUser = await User.findOneAndUpdate({"name":data.name},
            { $pull : { tdl: {title:req.body.title}  }}).exec();
        res.sendStatus(200);
    }
    catch (e){
        console.log("Error in post Announce" + e)
        res.status(500).send("Some Error occurred" + e);
    }
})

module.exports = router ;
