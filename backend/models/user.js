const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    UserName:{type:String,required:true,unique:true},
    Email:{type:String,required:true},
    password:{type:String,required:true}
},{timestamps:true});

module.exports=mongoose.model('User',userSchema);


