const { Schema } = require("mongoose");

const UserSchema = new Schema({
    
    email:{
        type:String,
        required:true,
        unique:true
    },

    imageURL:{
        type:String,
        default:null
    },
    
    type:{
        type:String,
        required:true,
        default:'user'
    }

})


module.exports = UserSchema;