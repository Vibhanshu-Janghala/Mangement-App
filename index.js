const express = require('express');
let app = express();
const httpServer = require("http").createServer(app);
const options = { /* ... */ };
const io = require("socket.io")(httpServer, options);
const chatHandler = require("./config/chat_controller")
const port = 3000;


//add mongoose connection

// handling the rest api
app.use(require("./routes.js"));

// handling sockets
// socket used for chat and workflow

io.on("connection", socket => {

    // chat handling
    socket.on("prevChat",chatHandler.prevChat);
    socket.on("message",chatHandler.message);

    // workflow handling
    socket.on()

         });

httpServer.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
