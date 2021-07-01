const Chat = require("../models/chat");

module.exports = function (io, socket) {

    socket.on("newRoom", async (data, fn) => {
        if (socket.data.level === 2) {
            try {
                const newRoom = new Chat({"room": data.room, "content": []});
                let saveRoom = await newRoom.save();
                fn({status: 200});
                io.emit("createRoom", data);
            } catch (e) {
                console.log("Error in newRoom" + e);
            }
        } else {
            fn({status: 401});
        }
    });
    socket.on("deleteRoom", async (data, fn) => {
        if (socket.data.level === 2) {
            try {
                await Chat.findOneAndDelete({"room": data.room},).exec();
                io.emit("delRoom", data);
                fn({status: 200});
            } catch (e) {
                console.log("Error in deleteRoom" + e);
            }
        } else {
            fn({status: 401});
        }
    });
    socket.on("prevChat", async () => {
        try {
            let prevChat = await Chat.find().exec();
            socket.emit("currentChat", prevChat);
        } catch {
            console.log("Error while sending previous chat");
        }
    });

    socket.on("message", async (data, fn) => {
        try {

            data.timeStamp = new Date();
            await Chat.findOneAndUpdate({"room": data.room},
                {
                    $push:
                        {
                            content:
                                {
                                    "message": data.message,
                                    "sender": data.sender,
                                    "timeStamp": data.timeStamp
                                }
                        }
                }).exec();
            fn({status: 200});
            io.emit("newMessage", data);

        } catch {
            console.log("Error while handling chat message");
        }
    });

};