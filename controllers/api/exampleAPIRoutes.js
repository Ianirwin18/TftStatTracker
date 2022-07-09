const router = require('express').Router();
const { Champion } = require('../../models');

//this get routes will return all data of example table from the database
router.get('/', async (req, res) => {
  const examplesData = await Champion.findAll();
  console.log('examples', examplesData);
  res.json(examplesData);
});

router.post('/', async (req, res) => {
  try {
    // Create the UserChamp
    const createUser = await Users.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(200).json(createUser);
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;
