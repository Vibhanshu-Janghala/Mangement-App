const express = require("express");
const router = express.Router();
//get all announcement
router.get("/announcements", async (req, res) => {
    try {
        const aList = await Announcement.find({}).exec;
        res.status(200).send(aList)
    }
    catch (err) {
        console.log(err)
    }
})

//add an announcement
router.post("/addAnnouncement",async (req,res)=>{
    try{
        const newAnnouncement = new Announcement(req.body);
        let saveAnnouncement = await newAnnouncement.save().exec
        console.log(saveAnnouncement)
        res.sendStatus(200);
    }
    catch (e){
        console.log("Error in post Announce" + e)
        res.status(500).send(e);
    }
})
// delete an announcement
router.delete("/delAnnouncement",async (req,res)=>{
    try{
        let delAnnouncement = await Announcement.findByIdAndDelete(req.id).exec;
        console.log(delAnnouncement);
        res.sendStatus(200);
    }
    catch (e) {
     console.log("Error while deleting" + e)
     res.status(500).send(e)
    }
})
module.exports = router ;