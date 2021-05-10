const Chat = require("../models/chat");

module.exports = {
    "prevChat": () => {
        Chat.find().exec().then((value) => {
            console.log(value);
            socket.emit("currentWorkflow", value);
        })
            .catch(
                (e) => {
                    console.log(e);
                }
            );
    },

    "message": (data,fn) => {
        fn({"status":200});
        data.timeStamp = new Date();
        socket.broadcast.emit("newMessage", data)
        Chat.findOneAndUpdate({"room": data.room},
            {
                $push:
                    {
                        content:
                            {"message": data.message,
                                "sender": data.name,
                            "timeStamp": data.timeStamp}
                    }
            }
        ).exec()
            .then(()=>console.log("Successfully added message"))
            .catch((e) => {
                console.log("Error adding message"+ e);
            });
    }

};