const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
