const app = require('express')();
const server = require('http').createServer(app);
const options = { /* ... */ };
const io = require('socket.io')(server, options);
const Chat = require("../models/chat")

let user =[];
    //add callbacks later
io.on('connection', (socket) => {
    // didnt validate socket username
    //update who is online
    user.push(socket.username);
    io.emit("updateOnline",user);
    //send previous chat
    socket.on("prevChat",()=>{
        Chat.find().exec.then((value)=>
        {   console.log(value);
            socket.emit("currentWorkflow",value);
        })
            .catch(
                (e)=>{console.log(e);}
            )
    });
    //received message event
    //new message should broadcast and update mongodb for respective room
    socket.on("message",(data) =>{
        socket.to(data.room).emit("newMessage",data)
        Chat.findOneAndUpdate({"room":data.room},
            {$push:
                {content:
                    {"message":data.message,"sender":data.name}}}
                    ).then(console.log("Successful")).catch((e)=>{console.log(e)})
    });
    //disconnect event
    //change online users
    socket.on("disconnect",(reason)=>{
        console.log(reason);
        const myIndex = user.indexOf(socket.username);
        let result = myIndex > -1 ? user.splice(myIndex, 1):false;
        console.log(result);
    })

});


server.listen(3000);