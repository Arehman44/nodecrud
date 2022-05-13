const mongoose = require("mongoose");
const StudentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Student",StudentSchema);