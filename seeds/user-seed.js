const User = require("../models/User");
const { faker } = require("@faker-js/faker");
async function seedUser(numbers) {
  await User.deleteMany();
  const users = [];
  for (let i = 0; i < numbers; i++) {
    const [firstName, lastName] = [
      faker.name.firstName(),
      faker.name.lastName(),
    ];
    const created = await User.create({
      username: faker.internet.userName(firstName, lastName),
      email: faker.internet.email(firstName, lastName),
    });
    users.push(created);
  }

  return users;
}
module.exports = seedUser;
