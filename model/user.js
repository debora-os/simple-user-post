const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
