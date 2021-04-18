const { Schema } = require("mongoose");


const ProductSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    imageURL:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }

})

module.exports = ProductSchema;