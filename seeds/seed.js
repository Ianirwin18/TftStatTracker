const sequelize = require("../config/connection");
const { Champion, User, Match, MatchChampion } = require("../models");
const champs = require("./finalForm.json");
const users = require("./users.json");
const userFiles = require("./userFiles.json");
const getMatchSeed = require("./matches");
const bcrypt = require("bcrypt");
//have array of users

// force: true will drop the table if it already exists
//npm run seed will execute this file, which will seed the database with the example data
const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  let champMatches = [];
  //console.log(champs)

  const examples = await Champion.bulkCreate(champs);
  console.log(`seeded ${examples.length} examples`);
  const userExamples = await User.bulkCreate(users);
  console.log(`seeded ${userExamples.length} users`);
  for (let userFile of userFiles) {
    let { matchChamps, userMatch } = await getMatchSeed(
      `./${userFile.file}`,
      userFile.id
    );
    console.log(matchChamps);
    const matchExamples = await Match.bulkCreate(userMatch);
    console.log(`seeded ${matchExamples.length} matches`);
    champMatches = [...champMatches, ...matchChamps];
  }
  for (let i in champMatches) {
    champMatches[i].id = i + 1;
  }

  const exampleChampMatches = await MatchChampion.bulkCreate(champMatches, {
    ignoreDuplicates: true,
  });
  console.log(`seeded ${champMatches.length} matchChamps`);

  process.exit(0);
};

seedDatabase();

//an empty array and push the data in to values array using for loop.
//I have already created a table "Employee" with column name which is I am pushing //Data in same Manner.Note :- (Remember While Pushing data which will same Order as Your table column name)


