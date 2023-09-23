const express = require('express');

const route = express.Router();

const controller = require('../controllers/post');

route.post('/add-post', controller.addPost);

module.exports = route;

