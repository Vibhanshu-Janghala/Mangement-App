module.exports = {
    "prevChat": () => {
        Chat.find().toArray().exec.then((value) => {
            console.log(value);
            socket.emit("currentWorkflow", value);
        })
            .catch(
                (e) => {
                    console.log(e);
                }
            )
    },

    "message": (data) => {
        socket.broadcast.emit("newMessage", data)
        let timeR = new Date().getTime();
        Chat.findOneAndUpdate({"room": data.room},
            {
                $push:
                    {
                        content:
                            {"message": data.message, "sender": data.name, "timeRegistered": timeR}
                    }
            }
        )
            .then(console.log("Successful"))
            .catch((e) => {
                console.log(e)
            })
    }

};