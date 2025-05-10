const express = require('express');
const { createBlog, getAllBlogs, updateBlog, deleteBlog } = require('../controllers/blog.controller');
const upload = require('../middlewares/upload');
const { protect } = require('../middlewares/auth.middleware');

const route = express.Router();

route.post('/create',protect,upload.single('image'),createBlog);
route.get('/get-all',protect,getAllBlogs);
route.put('/update/:id',protect,upload.single('image'),updateBlog);
route.delete('/delete/:id',protect,deleteBlog);

module.exports = route;