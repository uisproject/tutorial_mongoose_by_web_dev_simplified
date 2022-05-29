const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
});

// but the thing is, this validation won't ben applied since this only works when you try to create user only, so imo i don't think i should this method, better to validate in backend ex: node.js,etc
const userSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 2,
    max: 100,
    validate: {
      validator: (v) => v % 2 === 0,
      message: (props) => `${props.value} is not an even number`,
    },
  },
  email: {
    type: String, // the more options can be used like this
    // required: true,
    lowercase: true, // or you can use uppercase
  },
  createdAt: {
    type: Date,
    immutable: true, // you can modify this column to immutable, meaning if you do some changes it wont be changed
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  bestFriend: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  hobbies: [String],
  address: addressSchema,
});

// you can make a function as your schema and remember you can't use arrow function because it needs this
userSchema.methods.sayHi = function () {
  console.log(`Hi My name is ${this.name}`);
};

// you also can make a static function to custom find
userSchema.statics.findByName = function (name) {
  return this.find({ name: new RegExp(name, "i") });
};

// userSchema query is followed by statics schema
userSchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, "i") });
};

// so in the end you can choose the style wether you want to try the methods way or statics way

userSchema.virtual("namedEmail").get(function () {
  return `${this.name} < ${this.email}`;
});

userSchema.pre("save", function (next) {
  // this is some kind of middleware so this will be run before the save

  // do something
  this.updatedAt = Date.now();

  // you can fail the process by throwing the error
  throw new error("fail save");

  // just like express
  next(); // you can go to the next middleware
}); // save/ remove/ validate

userSchema.post("save", function (doc, next) {
  // this is some kind of middleware so this will be run before the save

  // do something
  doc.sayHi(); //

  // just like express
  next(); // you can go to the next middleware
}); // save/ remove/ validate

module.exports = mongoose.model("user", userSchema);
