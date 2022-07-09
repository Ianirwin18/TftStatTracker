
const Champion = require("./Champion");
const User = require("./User");
const Match = require("./Match");

Champion.belongsToMany(Match, {
    through: "match_champion"
});

Match.belongsToMany(Champion, {
    through: "match_champion"
})

Champion.belongsTo(User, {
    through: {
        model:Champion,
        unique: false,
    },
    as: "Champion"
});

User.belongsToMany(Champion, {
    through: {
      model: User,
      unique: false,
    },
    as: "User"
  })


module.exports = { 
    Champion, 
    User, 
    Match,
}
