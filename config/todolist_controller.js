//get todolist
router.get("/todolist", async (req, res) => {
    try {
        const toDoList = await User.findById(req.id).exec;
        res.status(200).send(toDoList.tdl)
    }
    catch (err) {
        console.log(err)
    }
})

//update an item
// both add and delete item are handled by this function
router.post("/addtodoitem",async (req,res)=>{
    try{
        let updateUser = await User.findByIdAndUpdate(req.body.id,req.body.tdl).exec
        console.log("updated" + updateUser)
        res.sendStatus(200);
    }
    catch (e){
        console.log("Error in post Announce" + e)
        res.status(500).send(e);
    }
})
