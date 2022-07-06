const router = require('express').Router();

const apiRoutes = require('RGAPI-2475242d-0b67-4ab2-bae0-907812c4fd2f');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
