const express = require('express');
const { postStory, getFollowingStories } = require('../controller/story');
const router = express.Router();

//post a story 
router.route('/').post(postStory);

//get all story's of your following 
router.route('/').get(getFollowingStories);

//get details of a story 
router.route('/:id').get();

//delete a story
router.route('/:id').delete();

module.exports = router;