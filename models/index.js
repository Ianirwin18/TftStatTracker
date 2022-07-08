
const Champion = require("./Champion");
const User = require("./User");
const Match = require("./Match");

Champion.belongsToMany(Match, {
    through: "match_champion"
});

Match.belongsToMany(Champion, {
    through: "match_champion"
})


module.exports = { Champion, User, Match }
