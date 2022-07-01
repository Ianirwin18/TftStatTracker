const router = require('express').Router();

const apiRoutes = require('../controllers/api');

router.use('../controllers/api', apiRoutes);

module.exports = router;