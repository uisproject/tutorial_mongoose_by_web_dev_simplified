const mongoose = require("mongoose");
const User = require("./User");

// setup
mongoose.connect(
  "mongodb://localhost/testdb",
  () => {
    console.log("connected");
  },
  (e) => console.error(e)
);

const run = async () => {
  // First Way
  // const user = new User({
  //   name: "Louis",
  //   age: 26,
  //   hobbies: ["Weight Lifting", "Bowling"],
  //   address: {
  //     street: "Main st",
  //   },
  // });
  // await user.save();

  // Second Way
  // try {
  //   const user = await User.create({
  //     name: "Louis",
  //     age: 22,
  //     hobbies: ["Weight Lifting", "Bowling"],
  //     email: "l",
  //     address: {
  //       street: "Main st",
  //     },
  //   });
  //   console.log(user);
  // } catch (e) {
  //   // console.error(e.errors.age); // there are bunch of information here that might interest you out
  //   console.error(e.message);
  // }
  // console.log("--");

  // const user = await User.where("name")
  //   .equals("Louis")
  //   .where("age")
  //   .gt(20)
  //   .populate("bestFriend")
  //   .limit(5); // you can query to find the data like this just like the regular query of mongoDB

  // user[0].bestfriend = "629181263ef1c54e7d79d648";
  // await user[0].save();

  // const user = await User.findOne({ name: "Louis" });

  // using static way
  // const user = await User.findByName("Jack");

  // using query way
  // const user = await User.find().byName("Louis");
  // const user = await User.where().byName("Louis");

  // using methods way
  // user.sayHi();

  // virtual
  const user = await User.findOne({ name: "Louis" });
  console.log(user.namedEmail); // well this is a great part which you can create a kinda like template maybe and be used anywhere

  // console.log(user);
};

run();
