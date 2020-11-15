const mongoose = require("mongoose")

const chatSchema = mongoose.Schema({
    title:{type:String,required:true,unique:true},
    content:[{
        message:{type:String},
        sender:{type:String},
        timeStamp:true,
    }]
})

const Chat = mongoose.model("Chat",chatSchema)
module.exports = Chat;