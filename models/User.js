const mongoose = require('mongoose')
const Schema = mongoose.Schema()

const userSchema={
    firstname:String,
    lastname:String,
    phoneNumber:Number,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{type:String},
    address:{
        city:String,
        code:Number,
    }
}
const user = mongoose.model("user",userSchema)
module.exports = user