const express = require('express');
const router = express.Router();
const { privateInfo } = require('../controller/private');
const { protect } = require('../middleware/auth');

router.route('/').get(protect,privateInfo);


module.exports = router;