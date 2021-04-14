const express = require("express");
const User = require("../models/users");
const router = express.Router();
//get todolist
router.get("/get", async (req, res) => {
    try {
        const userDoc = await User.findOne(req.body.name).exec();
        res.status(200).send(userDoc.tdl)
    }
    catch (err) {
        console.log("Some Error occurred" + err);
        res.status(500).send("Some Error occurred" + err);
    }
})

//update an item
// both add and delete item are handled by this function
router.post("/addToDoItem",async (req,res)=>{
    try{
        let updatedUser = await User.findOneAndUpdate({"name":req.body.name},{"tdl":req.body.tdl}).exec();
        console.log("Updated ToDoList" + updatedUser)
        res.sendStatus(200);
    }
    catch (e){
        console.log("Error in post Announce" + e)
        res.status(500).send("Some Error occurred" + e);
    }
})

module.exports = router ;
