const express = require("express");
const User = require("../models/users");
const router = express.Router();
//get todolist
router.get("/get", async (req, res) => {
    try {
        let data = req.getAttribute("Authorization");
        const userDoc = await User.findOne({name:data.name}).exec();
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
        let data = req.getAttribute("Authorization");
        let updatedUser = await User.findOneAndUpdate({"name":data.name},
            { $push : { "tdl": req.body.tdl} }).exec();
        console.log("Updated ToDoList" + updatedUser)
        res.sendStatus(200);
    }
    catch (e){
        console.log("Error in post Announce" + e)
        res.status(500).send("Some Error occurred" + e);
    }
})

router.post("/deleteToDoItem",async (req,res)=>{
    try{
        let data = req.getAttribute("Authorization");

        let updatedUser = await User.findOneAndUpdate({"name":data.name},
            { $pull : { tdl: {title:req.body}  }}).exec();
        console.log("Updated ToDoList" + updatedUser)
        res.sendStatus(200);
    }
    catch (e){
        console.log("Error in post Announce" + e)
        res.sendStatus(500);
    }
})

module.exports = router ;
