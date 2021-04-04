let socket;
// NEW CARD SOCKET NOT DONE
    socket.on("getWorkflow",() =>{
        Workflow.find().toArray().exec.then((value)=>
            {   console.log(value);
                socket.emit("currentWorkflow",value);
            })
            .catch(
                (e)=>{console.log(e);}
            )
    });

    //realtime Individual Handling

    socket.on("updateWorkflow",(data)=>{

        socket.broadcast.emit("updateCard",data)
        Workflow.findOneAndUpdate({"listName":data.listName,
            content: { $elemMatch: { "title": data.title }  }
            },
            data.card
        ).exec.then(console.log("Successful")).catch((e)=>{console.log(e)})
    });

    socket.on("deleteWorkflow",(data)=>{
        socket.broadcast.emit("deleteCard",data)
        Workflow.findOneAndDelete({"listName":data.listName,
                content: { $elemMatch: { "title": data.title } }
            }
        ).exec.then(console.log("Successful")).catch((e)=>{console.log(e)})
    });
    // Real time List Handling
    socket.on("createList",(data)=>{
        //update complete workflow
        socket.broadcast.emit("createList",data)
        Workflow.create({"listName":data.listName,"content":[]})
    });

    socket.on("deleteList",(data)=>{
        //update complete workflow
        socket.broadcast.emit("deleteList",data)
        Workflow.findOneAndDelete({"listName":data.listName}
            ).exec.then(console.log("Successful")).catch((e)=>{console.log(e)})
    });