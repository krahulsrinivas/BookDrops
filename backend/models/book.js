const mongoose=require('mongoose');

const bookSchema= new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    genre:{type:String},
    imageUrl:{type:String},
    author:{type:String},
    status:{type:String},
    content:{},
},{timestamps:true});

module.exports=mongoose.model('Book',bookSchema);