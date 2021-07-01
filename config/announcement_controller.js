const express = require("express");
const Announcement = require("../models/announcements");
const router = express.Router();

//get all announcement
router.get("/", async (req, res) => {
    try {
        const aList = await Announcement.find({}).exec();
        res.status(200).send(aList)
    }
    catch (err) {
        console.log("Some Error occurred" + err);
        res.status(500).send("Some Error occurred" + err);
    }
})

//add an announcement
router.post("/add",async (req,res)=>{
    let userData = JSON.parse(req.get("Authorization"));
    if(parseInt(userData.level) === 2)
    {
      
        try{
        const newAnnouncement = new Announcement({"title":req.body.title,"description":req.body.description});
        let saveAnnouncement = await newAnnouncement.save();
        res.status(200).send("Successful");
         }
         catch (e){
        console.log("Error in post Announce" + e)
        res.status(500).send(e);
         }
    }
    else{
        res.status(401).send("Unauthorized")
    }
})
// delete an announcement
router.delete("/delete",async (req,res)=>{
    let userData = JSON.parse( req.get("Authorization"));
	
    if(userData.level === 2)
    {
        try{
            let delAnnouncement = await Announcement.findOneAndDelete({title:req.body.title}).exec();
            res.sendStatus(200);
        }
        catch (e) {
            console.log("Error while deleting" + e)
            res.status(500).send("Error occurred " +e);
        }
    }
	else{
		res.status(401).send("Access Denied");
	}
})
module.exports = router ;