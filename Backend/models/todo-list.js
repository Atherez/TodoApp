const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const TodoListSchema=new Schema({
    user_id:{
        type:String,
        required:true,

    },
    list_name:{
        type:String,
        required:true,
        unique:true,
    },
    task_arr:[{
        task_id:{
            type:String,
            required:true,
            unique:true,
        }
    }],
    creation_date:{
        type:Date,
        default:Date.now()
    },

})
module.exports= TodoList= mongoose.model('myList',TodoListSchema);