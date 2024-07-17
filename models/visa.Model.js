const mongoose = require('mongoose')

const VisaModel = new mongoose.Schema({
    VisaRecordNumber:{
        type : Number,
        required : true
    },
    PasswordNumber:{
        type : Number,
        required : true
    },
    Country : {
        type : String,
        required : true
    },
    dateofbirth:{
        type:String,
        required : true
    },
    pdf:{
        type:String,
        // required : true
    }
},{timestamps:true})

const visa = mongoose.model("visa" , VisaModel)

module.exports = visa