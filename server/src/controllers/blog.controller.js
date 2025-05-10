const Blog = require("../model/Blog");

// Create blog
const createBlog = async(req,res)=>{
    const {title,description} = req.body;
    try{
        if(!req.file){
            return res.status(400).json({message:"Image is required"});
        }

        const imageUrl = `/uploads/${req.file.filename}`; // relative path

        const newBlog = new Blog({
            title,
            description,
            imageUrl
        });
        await newBlog.save();
        res.status(200).json({message:"Blog created successfully",blog:newBlog})
    }catch(error){
        console.error("Error creating blog : ",error);
        res.status(500).json({message:"Error creating blog"})
    }
}

// Get all blog
const getAllBlogs = async(req,res)=>{
    try{
        const blogs = await Blog.find().sort({createdAt:-1}); //newest first
        res.status(200).json(blogs);
    }catch(error){
        console.error("Error getting all blog : ",error );
        res.status(500).json({message:"Error getting all blog"});
    }
}



module.exports = {
    createBlog,
    getAllBlogs
}