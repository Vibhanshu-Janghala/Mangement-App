const mongoose = require("mongoose")

const chatSchema = new mongoose.Schema({
    room:{type:String,required:true,unique:true},
    content:[{
        message:{type:String},
        sender:{type:String},
        timeStamp:true,
    }]
})

const Chat = mongoose.model("Chat",chatSchema)
module.exports = Chat;