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
router.post("/addannouncement",async (req,res)=>{
    try{
        const newAnnouncement = new Announcement(req.body);
        let saveAnncouncement = await newAnnouncement.save().exec
        console.log(saveAnncouncement)
        res.sendStatus(200);
    }
    catch (e){
        console.log("Error in post Announce" + e)
        res.status(500).send(e);
    }
})
// delete an announcement
router.delete("/delannouncement",async (req,res)=>{
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