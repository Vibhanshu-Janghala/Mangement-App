const Workflow = require("../models/workflow");
module.exports = {
    "getWorkflow": () =>{
        Workflow.find().exec().then((value)=>
        {   console.log(value);
            socket.emit("currentWorkflow",value);
        })
            .catch(
                (e)=>{console.log(e);}
            )
    },
    "addNewCard":(data,fn)=>{
        fn({"status":200});
        Workflow.findOneAndUpdate({"listName":data.listname},
            { $push: {"content":data.card} }
        ).exec().then(()=>console.log("Card Successfully Added"))
            .catch((e)=>{console.log(e)});
        socket.broadcast.emit("newCard",(data));
    },
    "updateWorkflow":(data,fn)=>{

        fn({"status":200});
        socket.broadcast.emit("updateCard",data)
        Workflow.findOneAndUpdate({"listName":data.listName,
                content: { $elemMatch: { "title": data.title }  }
            },
            data.card ,{}
        ).exec.then(()=>console.log("Successfully Updated Card"))
            .catch((e)=>{console.log(e)})
    },
    "deleteWorkflow":(data,fn)=>{
        fn({"status":200});
        socket.broadcast.emit("deleteCard",data)
        Workflow.findOneAndDelete({"listName":data.listName,
                content: { $elemMatch: { "title": data.title } }
            }
        ).exec().then(()=>console.log("Successfully Deleted Card"))
            .catch((e)=>{console.log(e)})
    },
    "createList": (data,fn)=>{
        //update complete workflow
        fn({"status":200});
        socket.broadcast.emit("createNewList",data)
        Workflow.create({"listName":data.listName,"content":[]}).exec()
            .then(()=>{console.log("List Created")})
            .catch((e)=>{console.log("Error while adding List" +e)})
    },
    "deleteList":(data,fn)=>{
        //update complete workflow
        fn({"status":200});
        socket.broadcast.emit("deleteThisList",data)
        Workflow.findOneAndDelete({"listName":data.listName}
        ).exec().then(()=>console.log("Successful")).catch((e)=>{console.log(e)})
    }

};
