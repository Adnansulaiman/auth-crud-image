const express = require('express');
const { createBlog, getAllBlogs } = require('../controllers/blog.controller');
const upload = require('../middlewares/upload');

const route = express.Router();

route.post('/create',upload.single('image'),createBlog);
route.get('/get-all',getAllBlogs);

module.exports = route;