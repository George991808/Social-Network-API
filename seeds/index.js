const seedUser = require("./user-seed");
const db = require("./../config/connection");
const seedAll = async () => {
  await seedUser(5);
  console.log("user seeded");
  process.exit(0);
};
db.once("open", () => {
  seedAll();
});
