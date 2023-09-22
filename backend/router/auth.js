const express = require('express');
const { register, login, updateUser } = require('../controller/auth');
const { protect } = require('../middleware/auth');
const router = express.Router();

//register a new user 
router.route('/register').post(register);

// login a user
router.route('/login').post(login);

//update user (for now only the dp and cover pic i will update password later)
router.route('/update').put(protect,updateUser);

module.exports = router;