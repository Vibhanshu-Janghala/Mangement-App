const Workflow = require("../models/workflow");
module.exports = function (io,socket) {


        socket.on("getWorkflow", () => {
            Workflow.find().exec().then((value) => {
                console.log(value);
                socket.emit("currentWorkflow", value);
            })
                .catch(
                    (e) => {
                        console.log(e);
                    }
                )
        });

        socket.on("addWorkflow", async (data, fn) => {
			console.log(data);
			console.log(data.card.progressList);
            if(socket.data.level === 2 || socket.data.level === 1){
                try {
					console.log(await Workflow.findOne({"listName":data.listName}));
                    await Workflow.findOneAndUpdate({"listName": data.listname},
                        {
                            $push:
                                {
                                    content : {"title":data.card.title,
										"description":data.card.description,
										"managedBy": data.card.managedBy,
										"dueDate":data.card.dueDate,
										"priority":data.card.priority,
										"progressList":data.card.progressList
										}
                                }
                        }).exec();
                    fn({"status": 200});
                    socket.broadcast.emit("newCard", (data));
                } catch {
                    console.log("Error while Adding Card");
                }
            }
            else{
                fn({"status" :401});
            }
        });

        socket.on("updateWorkflow", async (data, fn) => {

            if(socket.data.level === 2 || socket.data.level === 1){
                try {
                    await Workflow.findOneAndUpdate({
                            "listName": data.listName,
                            content: {
                                $elemMatch: {"title": data.title}
                            }
                        },
                        data.card, {}).exec();
                    fn({"status": 200});
                    socket.broadcast.emit("updateCard", data);
                } catch {
                    console.log("Error while Updating")
                }
            }
            else{
                fn({"status":401});
            }
        });

        socket.on("deleteWorkflow", async (data, fn) => {
            if(socket.data.level === 2 || socket.data.level === 1){
                try {
                    await Workflow.findOneAndDelete({
                        "listName": data.listName,
                        content: {
                            $elemMatch: {
                                "title": data.title
                            }
                        }
                    }).exec();
                    fn({"status": 200});
                    socket.broadcast.emit("deleteCard", data)
                } catch {
                    console.log("Error while deleting")
                }
            }
            else{
                fn({"status":401});
            }
        });

        socket.on("createList", async (data, fn) => {

            if (socket.data.level === 2 || socket.data.level === 1) {
                try {

                    const newList = new Workflow({"listName": data.listName, "content":[]});
                    await newList.save();
                    fn({"status": 200});
                    socket.broadcast.emit("createNewList", data);
                }
                catch (e) {
                    console.log(e);
                }
            } else {
                fn({"status": 401})
            }
        });

        socket.on("deleteList", async (data, fn) => {

            if (socket.data.level === 2 || socket.data.level === 1) {

                try {
                    await Workflow.findOneAndDelete({"listName": data.listName}).exec();
                    socket.broadcast.emit("deleteThisList", data);
                    fn({"status": 200});
                } catch (e) {
                    console.log(e);
                }
            } else {
                fn({"status": 401});
            }
        });
};
