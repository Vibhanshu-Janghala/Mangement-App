const express = require('express')();
let app = express;
const httpServer = require("http").createServer(app);
const socketOptions = {
    transports:["websocket"]
};
const dbOptions = {

};
const io = require("socket.io")(httpServer,socketOptions);
const chatHandler = require("./config/chat_controller");
const workflowHandler = require("./config/workflow_controller");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const port = 3000;
const databaseURL= "";
let usersOnline = [];


//Add mongoose connection
mongoose.connect(databaseURL,dbOptions)
    .then(()=>console.log("Database connection ready"))
    .catch((e)=>console.log("Connection Error" + e));

// If mongoose connection fails after sometime
mongoose.connection.on('error',(e)=>console.log("Some DB error occurred" + e));


// REST APIs file linker
app.use(require("./routes.js"));

// Handling socket used for chat and workflow

// Auth handling middleware
io.use(async(socket,next)=>{
  if(socket.handshake.auth === null){
  next(new Error("No Authorization"))
  }
  else{
      let tokData = await jwt.verify(socket.handshake.auth,ACCESS_TOKEN_KEY);
      if(tokData.name === socket.username){
          usersOnline.push(socket.username);
          next();
      }
    next(new Error("Authorization Failed"));
  }

})
// Functionality handling
io.on("connection", socket => {

    // emit online users
    socket.emit("updateOnline",usersOnline)

    // chat handling
    socket.on("prevChat",chatHandler.prevChat);
    socket.on("message",chatHandler.message);

    // workflow handling
    socket.on("getWorkflow",workflowHandler.getWorkflow);
    socket.on("addNewCard",workflowHandler.addNewCard);
    socket.on("updateWorkflow",workflowHandler.updateWorkflow);
    socket.on("deleteWorkflow",workflowHandler.deleteWorkflow);
    socket.on("createList",workflowHandler.createList);
    socket.on("deleteList",workflowHandler.deleteList);

    socket.on("disconnecting",()=>{
        let delIndex = usersOnline.indexOf(socket.name);
       usersOnline.splice(delIndex,1);
       console.log("User disconnecting" + socket.name)
    });
    socket.on("disconnect",()=>{
        console.log("Socket Disconnected");
    })

         });

httpServer.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

// Graceful shutdown of App
process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    console.log('Closing http server.');
    httpServer.close(() => {
        console.log('Http server closed.');
        // close connection after pending requests complete
        mongoose.connection.close(false, () => {
            console.log('MongoDb connection closed.');
            process.exit(0);
        });
    });
});
