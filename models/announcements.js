const mongoose = require("mongoose")

const AnnouncementSchema = new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required: true},
    tag:{type:String,required:false},
    timeStamp:true
})
const Announcement = mongoose.model("Announcement",AnnouncementSchema)
module.exports = Announcement;