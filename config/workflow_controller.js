const app = require('express')();
const server = require('http').createServer(app);
const options = { /* ... */ };
const io = require('socket.io')(server, options);

let user =[];
//auth for socket io
io.use((socket, next) => {

    let tokData = jwt.verify(socket.authToken,ACCESS_TOKEN_KEY);
    if(socket.user === tokData.name && socket.lvl > 1)
    {
        //check access level then
        //access granted
        next();
    }
    else{
        //some error occurred
    }
});


//add callbacks later
io.on('connection', (socket) => {
    //send last updated workflow
    socket.on("getworkflow",() =>{
        Workflow.find().exec.then((value)=>
            {   console.log(value);
                socket.emit("currentWorkflow",value);
            })
            .catch(
                (e)=>{console.log(e);}
            )
    });
    //realtime Individual Handling
    socket.on("updateWorkflow",(data)=>{
        //update complete workflow
        io.emit.to("workflow").emit("updateCard",data)
        Workflow.findOneAndReplace({"listName":data.listName,
            content: { $elemMatch: { "title": data.title }  }
            },
            data.card
        ).then(console.log("Successful")).catch((e)=>{console.log(e)})
    });
    socket.on("deleteWorkflow",(data)=>{
        //update complete workflow
        io.emit.to("workflow").emit("deleteCard",data)
        Workflow.findOneAndDelete({"listName":data.listName,
                content: { $elemMatch: { "title": data.title } }
            }
        ).exec.then(console.log("Successful")).catch((e)=>{console.log(e)})
    });
    // Real time List Handling
    socket.on("createList",(data)=>{
        //update complete workflow
        io.emit.to("workflow").emit("createList",data)
        Workflow.create({"listName":data.listName,"content":[]})
    });

    socket.on("deleteList",(data)=>{
        //update complete workflow
        io.emit.to("workflow").emit("deleteList",data)
        Workflow.findOneAndDelete({"listName":data.listName}
            ).exec.then(console.log("Successful")).catch((e)=>{console.log(e)})
    });


});


server.listen(3000);