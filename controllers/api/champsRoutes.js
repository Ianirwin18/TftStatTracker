router.post('/', async (req, res) => {
    try {
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