const express = require('express');
const { sendComment, findAllComment, getOneComment, deleteComment } = require('../controller/comment');
const router = express.Router();

//send a comment

router.route('/:postId').post(sendComment)

//get all comments of a post 
router.route('/:postId').get(findAllComment);

//get one comment
router.route('/target/:id').get(getOneComment);

//delete a comment
router.route('/:id').delete(deleteComment);

module.exports = router;