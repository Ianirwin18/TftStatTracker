const router = require('express').Router();

//rework later into api endpoints;
const apiRoutes = require('./api/champsRoutes');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
