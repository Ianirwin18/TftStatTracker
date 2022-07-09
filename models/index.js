const Champion = require("./Champion");
const User = require("./User");
const Match = require("./Match");
const MatchChampion = require("./MatchChampion");

Champion.belongsTo(User, {
  through: {
    model: Champion,
    unique: false,
  },
  as: "Champion",
});

User.belongsToMany(Champion, {
  through: {
    model: User,
    unique: false,
  },
  as: "User",
});

module.exports = {
  Champion,
  User,
  Match,
  MatchChampion,
};
