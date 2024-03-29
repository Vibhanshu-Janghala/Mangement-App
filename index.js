require('dotenv').config();
const cors = require("cors");
const express = require('express');
const cookieParser = require('cookie-parser');

let app = express();
const httpServer = require("http").createServer(app);

const dbOptions = {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true};
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

const path = require('path');
app.use(express.static(path.resolve(__dirname, './build')));


// REACT html api
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, './build', 'index.html'));
});

// REST APIs file linker
app.use(require("./routes.js"));


//Add mongoose connection
mongoose.connect(process.env.DATABASE_URL, dbOptions)
    .then(() => console.log("Database connection ready"))
    .catch((e) => console.log("Connection Error" + e));

// If mongoose connection fails after sometime
mongoose.connection.on('error', (e) => console.log("Some DB error occurred" + e));

// Handling socket used for chat and workflow
const socketOptions = {
    transports: ["websocket"],
    path: "/socket.io"
};
const io = require("socket.io")(httpServer, socketOptions);

const chatHandler = require("./config/chat_controller");
const workflowHandler = require("./config/workflow_controller");

// Socket Middlewares

io.use(async (socket, next) => {
    if (socket.handshake.auth === null) {
        socket.disconnect();
    } else {
        try {
            const tokData = await jwt.verify(socket.handshake.auth.authToken, "" + process.env.ACCESS_TOKEN_SECRET);
            if (tokData.name != null) {
                socket.data = {"name": tokData.name, "level": tokData.level};
                next();
            } else {
                socket.disconnect();
            }
        } catch (e) {
            console.log(e);
        }
    }
});


// Functionality handlers for Socket

let onlineUsers = {};
io.on("connection", (socket) => {
    onlineUsers[socket.data.name] = socket.id;

    io.emit("updateOnline", onlineUsers);
    socket.on("getOnline", async () => {
        socket.emit("updateOnline", onlineUsers);

    });

    chatHandler(io, socket);
    workflowHandler(io, socket);

    socket.on("disconnecting", () => {
        delete onlineUsers[socket.data.name];
        console.log("User disconnecting" + "  " + socket.data.name);
        io.emit("updateOnline", onlineUsers);
    });
    socket.on("disconnect", () => {
        console.log("Socket Disconnected");
    });
})


// Catch all API calls to REACT App
app.get(`*`, (req, res) => {
    res.sendFile(path.resolve(__dirname, './build', 'index.html'));
});

httpServer.listen(process.env.PORT || 8080, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
});

// Graceful shutdown of App
process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    console.log('Closing http server.');
    httpServer.close(() => {
        console.log('Http server closed.');
        // close connection after pending requests complete
        mongoose.connection.close(false).then(() => {
            console.log('MongoDb connection closed.');
            process.exit(0);
        }).catch((e) => console.log("Connection close error  " + e));
    });
});
