const router = require("express").Router();
const { User: Users } = require("../../models");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  try {
    const usersData = await Users.findAll({
      include: [{ all: true, nested: true }],
    });
    res.status(200).json(usersData);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userById = await Users.findByPk(req.params.id, {
      include: [{ all: true, nested: true }],
    });
    if (!userById) {
      return res.status(404).json({
        message: "This user ID does not exist. Please enter a valid user ID!",
      });
    }
    res.status(200).json(userById);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  console.log("REGISTER", req.body);
  try {
    const createUser = await Users.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(200).json(createUser);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteUser = await Users.destroy({
      where: { user_id: req.params.id },
    });
    if (!deleteUser) {
      return res.status(404).json({
        message: "This user ID does not exist. Please enter a valid user ID!",
      });
    }
    res.status(200).json(deleteUser);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await Users.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
