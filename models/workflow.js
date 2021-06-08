const mongoose = require("mongoose");
const cardSchema = require("../models/card")

//listName is workflow list and content is equivalent to cards in frontend
const workflowSchema = new mongoose.Schema({
    listName:{type:String,required:true,unique: true},
    content: [cardSchema]
});

const Workflow = mongoose.model("Workflow",workflowSchema);
module.exports = Workflow;