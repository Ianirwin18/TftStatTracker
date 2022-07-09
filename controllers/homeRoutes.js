//These are all the view routes for our application
const router = require('express').Router();

//when a GET request is received on the root(/) route,
//render the home.handlebars view
router.get('/', (req, res) => {
  res.render('home');
});

router.get('/otherpage', (req, res) => {
  //this will render the view otherpage.handlebars
  res.render('otherpage');
});
router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});
router.get('/stats', (req, res) => {
  res.render('stats');
});
module.exports = router;
