const { Schema } = require("mongoose");


const CartSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    products:{
        type:[{}],
        required:true
    },
    status:{
        type:String,
        default:"Pending" 
     },
     address:{
         type:String,
         required:true
     },
     mobile:{
         type:Number,
         required:true
     },

    date:{
        type:Date,
        default:new Date()
    }

})

module.exports = CartSchema