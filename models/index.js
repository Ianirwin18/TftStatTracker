const express = require('express');
const router = express.Router();
const router = express.Router();
const matches = require('./matches');

router.use('/profile', profile)
router.use('/matches', matches);

module.exports = router;