import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    pdfData:{
        type:Buffer,
        required:true
    },
    pdfFileName:{
        type:String,
        required:true
    },
    pdfMimeType:{
        type:String,
        required:true,
        default:'application/pdf'
    },
    authorImg:{
        type:String,
        required:true,
        default:"/profile.png"
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

const BlogModel = mongoose.models.blog || mongoose.model('blog',Schema);

export default BlogModel;