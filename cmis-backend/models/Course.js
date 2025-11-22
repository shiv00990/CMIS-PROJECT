const mongoose=require('mongoose');

const CourseSchema=new mongoose.Schema({
    courseCode:{
        type:String,
        required:true,
        unique:true
    },
    courseTitle:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    credits:{
        type:Number,
        required:true
    },
});

module.exports=mongoose.model('Course',CourseSchema);