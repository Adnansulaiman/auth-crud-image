const Blog = require("../model/Blog");
const fs = require('fs');
const path = require('path');



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

// Update a blog
const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Update fields
    blog.title = title || blog.title;
    blog.description = description || blog.description;

    // If new image is uploaded
    if (req.file) {
      // Delete old image from disk
      const oldImagePath = path.join(__dirname, "../uploads", path.basename(blog.imageUrl));
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }

      // Save new image path
      blog.imageUrl = `/uploads/${req.file.filename}`;
    }

    await blog.save();

    res.status(200).json({
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Error updating blog" });
  }
};


module.exports = {
    createBlog,
    getAllBlogs,
    updateBlog
}