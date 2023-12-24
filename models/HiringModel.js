const mongoose = require("mongoose");
const HiringSchema = new mongoose.Schema({
    email : {
        type : String,
        required :  true
    },
    password : {
        type : String,
        required : true
    }
})
const Hiring = mongoose.model('Hiring',HiringSchema);
module.exports = Hiring;