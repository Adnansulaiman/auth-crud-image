const express = require('express');
const { createBlog, getAllBlogs } = require('../controllers/blog.controller');
const upload = require('../middlewares/upload');
const { protect } = require('../middlewares/auth.middleware');

const route = express.Router();

route.post('/create',protect,upload.single('image'),createBlog);
route.get('/get-all',protect,getAllBlogs);

module.exports = route;