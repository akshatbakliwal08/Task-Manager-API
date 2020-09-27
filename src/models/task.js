const mongoose=require('mongoose');
const validator=require('validator');

const taskSchema=new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Users'
    },
    description:{
        type: String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
});

const Task=mongoose.model('Tasks',taskSchema);

module.exports=Task;