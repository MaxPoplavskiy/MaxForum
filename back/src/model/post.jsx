const mongoose = require('mongoose');
  

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
}); 

  
  
module.exports = mongoose.model("Post", postSchema);