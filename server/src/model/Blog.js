const mongoose = require('mongoose');

// Create mongoose schema
const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    }
});

// Create model
const Blog = mongoose.model('Blog',blogSchema);

module.exports = Blog;