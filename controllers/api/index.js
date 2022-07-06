//THIS index file is the entry point of our API(data) routes,
//it will bring in all api routes and export 1 router middleware
const router = require('express').Router();
// const usersRoutes = require('./userRoutes');
const championRoutes = require("./exampleAPIRoutes");

router.use('/champions', championRoutes);

module.exports = router;
