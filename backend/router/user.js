const express = require('express');
const { findAllUser } = require('../controller/user');
const router = express.Router();

//get all users
router.route('/').get(findAllUser);

//get one user
router.route('/:id').get();

//follow or unfollow a user 
router.route('/:id/follow').put();


module.exports = router;