const Workflow = require("../models/workflow");
module.exports = function (io, socket) {


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
    // data = {listName,title,completeCard}s
    socket.on("addWorkflow", async (data, fn) => {
        console.log(data);
        console.log(data.card.progressList);
        if (socket.data.level === 2 || socket.data.level === 1) {
            try {
                let tempDoc = await Workflow.findOne({"listName": data.listName}).exec();
                tempDoc.content.push({
                    "title": data.card.title,
                    "givenDescription": data.card.givenDescription,
                    "managedBy": data.card.managedBy,
                    "dueDate": data.card.dueDate,
                    "priority": data.card.priority,
                    "progressList": data.card.progressList
                });
                await tempDoc.save();

                fn({"status": 200});
                socket.broadcast.emit("newCard", (data));
            } catch(e) {
                console.log(e);
            }
        } else {
            fn({"status": 401});
        }
    });

    socket.on("updateWorkflow", async (data, fn) => {

        if (socket.data.level === 2 || socket.data.level === 1) {
			console.log(data);
            try {
                let tempDoc = await Workflow.findOneAndUpdate(
                    {"listName": data.listName, "content.title": data.title},
                    {
                        "$set": {
                            "content.$": {
                                "title": data.card.title,
                                "givenDescription:":data.card.givenDescription,
                                "managedBy": data.card.managedBy,
                                "dueDate": data.card.dueDate,
                                "priority": data.card.priority,
                                "progressList": data.card.progressList
                            }
                        }
                    }, {new: true}).exec();
                console.log(tempDoc);

                fn({"status": 200});
                socket.broadcast.emit("updateCard", (data));
            } catch {
                console.log("Error while Updating Card");
            }
        } else {
            fn({"status": 401});
        }
    });

    socket.on("deleteWorkflow", async (data, fn) => {
        if (socket.data.level === 2 || socket.data.level === 1) {
            try {
				console.log(data)
                let tempDoc = await Workflow.findOneAndUpdate(
                    {"listName": data.listName, "content.title": data.title},
                    {
                        "$pull": {
                            "content": {
                                "title": data.title
                            }
                        }
                    }, {new: true}).exec();
                console.log(tempDoc);
                fn({"status": 200});
                socket.broadcast.emit("deleteCard", data)
            } catch(e) {
                console.log(e);
            }
        } else {
            fn({"status": 401});
        }
    });

    socket.on("createList", async (data, fn) => {

        if (socket.data.level === 2 || socket.data.level === 1) {
            try {

                const newList = new Workflow({"listName": data.listName, "content": []});
                await newList.save();
                fn({"status": 200});
                socket.broadcast.emit("createNewList", data);
            } catch (e) {
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
