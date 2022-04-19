// const Thought = require("../models/Thought");
// const { faker } = require("@faker-js/faker");
// const User = require("../models/User");
// async function seedThought(numbers) {
//   await Thought.deleteMany();
//   const thoughts = [];
//   for (let i = 0; i < numbers; i++) {
//     const randomUser = (await User.aggregate([{ $sample: { size: 1 } }]))[0];
//     const created = await Thought.create({
//       thoughtText: faker.lorem.sentence(5),
//       username: randomUser,
//     });
//     thoughts.push(created);
//   }

//   return thoughts;
// }
// module.exports = seedThought;
