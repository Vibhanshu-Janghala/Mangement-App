const app = require('express')();
const server = require('http').createServer(app);
const options = { /* ... */ };
const io = require('socket.io')(server, options);

let user =[];
//auth for socket io
io.use((socket, next) => {

    let tokData = jwt.verify(socket.authToken,ACCESS_TOKEN_KEY);
    if(socket.user == tokData.name && socket.lvl > 1)
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
    //send workflow
    socket.emit("workflow",{null});
    //realtime Workflow
    socket.on("updateWorkflow",{null});


});


server.listen(3000);