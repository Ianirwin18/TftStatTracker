const sequelize = require('../config/connection');
const { Example } = require('../models');
const exampleData = require('./exampleData.json');

// force: true will drop the table if it already exists
//npm run seed will execute this file, which will seed the database with the example data
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const examples = await Example.bulkCreate(exampleData);
  console.log(`seeded ${examples.length} examples`);
  process.exit(0);
};

seedDatabase();


let sql = `insert ignore into employee values?`;

let values = [];

//an empty array and push the data in to values array using for loop.
//I have already created a table "Employee" with column name which is I am pushing //Data in same Manner.Note :- (Remember While Pushing data which will same Order as Your table column name)

//for loop is running till the length of the users;
