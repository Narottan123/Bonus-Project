const mongoose=require("mongoose");

const cardSchema=new mongoose.Schema({
    cardNumber:{
        type:String,
        required:true,
        unique:true
    },
    
    cardType:{
        type:String,
        enum:["Regular","Special"],
        required:true
    },
    customerName:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['Active','Inactive'],
        
        default:"Active"
    },
    vision:{
        type:String,
        required:true
    },
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Customer Details",
        required:true
    }

})

module.exports=mongoose.model('card details',cardSchema)