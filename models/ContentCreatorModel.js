const mongoose = require("mongoose");
const ContentCreatorSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    contenttype : {
        type : [String],
        required : true
    }
})
const ContentCreator = mongoose.model('ContentCreator',ContentCreatorSchema);
module.exports = ContentCreator;
