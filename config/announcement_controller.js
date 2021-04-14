const express = require("express");
const Announcement = require("../models/announcements");
const router = express.Router();

//get all announcement
router.get("/announcements", async (req, res) => {
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
router.post("/addAnnouncement",async (req,res)=>{
    if(req.lvl === 1)
    {
        try{
        const newAnnouncement = new Announcement(req.body);
        let saveAnnouncement = await newAnnouncement.save();
        console.log(saveAnnouncement)
        res.sendStatus(200);
         }
         catch (e){
        console.log("Error in post Announce" + e)
        res.status(500).send(e);
         }
    }
})
// delete an announcement
router.delete("/delAnnouncement",async (req,res)=>{
    if(req.lvl === 1)
    {
        try{
            let delAnnouncement = await Announcement.findByIdAndDelete(req.id).exec();
            console.log(delAnnouncement);
            res.sendStatus(200);
        }
        catch (e) {
            console.log("Error while deleting" + e)
            res.status(500).send(e)
        }
    }
})
module.exports = router ;