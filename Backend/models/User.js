const mongoose=require('mongoose');
const Schema=mongoose.Schema;

/* Schema for a User */

const UserSchema=new Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
});

module.exports= User= mongoose.model('myUser',UserSchema);