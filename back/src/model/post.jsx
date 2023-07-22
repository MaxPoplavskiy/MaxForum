const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    author: {
        type:String,
        required: true,
    },
    content: {
        type:String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now(),
    },
});

const postSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    title: {
        type: String,
        required: [true, "title is required"]
    },
    content: {
        type: String,
        required: [true, "content is required"]
    },
    image: {
        data: Buffer,
        contentType: String,
    },
    comments: [commentSchema],
}); 

  
  
module.exports = mongoose.model("Post", postSchema);