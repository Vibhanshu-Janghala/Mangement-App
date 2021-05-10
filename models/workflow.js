const mongoose = require("mongoose")

//listName is workflow list and content is equivalent to cards in frontend
const workflowSchema = new mongoose.Schema({
    listName:{type:String,required:true,unique: true},
    content: [{
        title: {type: String, required: true, unique: true},
        description: {type: String, required: true},
        priority: {type: String, required: true},
        progressList: {type: Array},
        managedBy :{type:String},
        dueDate :{type:Date}
    }]
})

const Workflow = mongoose.model("Workflow",workflowSchema)
module.exports = Workflow;