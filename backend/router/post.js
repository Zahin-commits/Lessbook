const express = require('express');
const { createPost, getAllPost, findOnePost, updatePost, deletePost, likePost } = require('../controller/post');
const router = express.Router();

//create a post 
router.route('/').post(createPost);

//get all posts 
router.route('/').get(getAllPost);

//get/edit/delete a post 
router.route('/:id').get(findOnePost)
.put(updatePost)
.delete(deletePost);

//like or dislike a post 
router.route('/:id/like').put(likePost);

module.exports = router;

