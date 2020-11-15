const mongoose = require("mongoose")

const AnnouncementSchema = mongoose.schema({
    title:{type:String,required:true},
    description:{type:String,required: true},
    tag:{type:String,required:false}
})
const Announcement = mongoose.model("Announcement",AnnouncementSchema)
module.exports = Announcement;