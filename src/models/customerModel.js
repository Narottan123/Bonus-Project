const mongoose=require('mongoose');

const customerSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    mobileNumber:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    DOB:{
        type:Date,
        required:true
    },
    emailId:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    address:{
        type:String,
        required:true,
        
    },
    customerId:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['ACTIVE','INACTIVE'],
        required:true
    }


})

module.exports=mongoose.model('Customer Details',customerSchema);