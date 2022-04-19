const seedUser = require("./user-seed");
const seedThought = require("./thought-seed");
const db = require("./../config/connection");
const seedAll = async () => {
  await seedUser(5);
  console.log("users seeded");

  // await seedThought(5);
  // console.log("thought seeded");
  process.exit(0);
};
db.once("open", () => {
  seedAll();
});
