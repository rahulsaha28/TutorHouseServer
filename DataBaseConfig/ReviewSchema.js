const { Schema } = require("mongoose");



const ReviewSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    user:{
        type:{},
        required:true,
    },

    rate:{
        type:Number,
        default:0
    },

    description:{
        type:String,
        required:true
    }
})


module.exports = ReviewSchema;