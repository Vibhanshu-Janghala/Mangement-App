const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {type: String,
        required: true},
    password:{type:String,
        required:true},
    level:{type: Number,
        required: true},
    dateRegistered : {
        type : Date,
        default : Date.now},
    email: {type: String,
        required: true,
        unique:true},
    tdl:{type: Array,
        default: []},

    refreshToken:{type:String,
        default:""}

})
const User = mongoose.model("User",userSchema)
module.exports = User;
