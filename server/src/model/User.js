const mongoose = require('mongoose');

// Creating mongoose schema
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

// create the model
const User = mongoose.model('User',userSchema);

module.exports = User;

