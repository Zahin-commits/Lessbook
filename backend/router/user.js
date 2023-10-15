const express = require('express');
const { findAllUser, findOneUser, findUserById, followUser, findUsers } = require('../controller/user');
const router = express.Router();

//get all users
router.route('/').get(findAllUser);

//get one user
router.route('/profile').get(findOneUser);

//search users by username
router.route('/search').get(findUsers);

// get one user by id
router.route('/:id').get(findUserById);

//follow or unfollow a user 
router.route('/:id/follow').put(followUser);


module.exports = router;