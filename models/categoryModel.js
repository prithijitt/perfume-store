import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    photo:{
        data:Buffer,
        contentType:String,
    },
    slug:{
        type:String,
        lowercase:true
    }
},{timestamps:true})

export default mongoose.model('category',categorySchema);