const express = require('express');
const { createBlog } = require('../controllers/blog.controller');
const upload = require('../middlewares/upload');

const route = express.Router();

route.post('/create',upload.single('image'),createBlog);

module.exports = route;