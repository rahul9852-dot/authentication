const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UsersSchema = mongoose.Schema({
  local: {
    email: String,
    password: String,
  },
  facebook: {
    id: String,
    token: String,
    name: String,
    email: String,
  },
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String,
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String,
  },
});

// methods
// generating hash
UsersSchema.methods.generateHash = async function (password) {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hashSync(password, salt);
};

UsersSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, user.password);
};

module.exports = mongoose.model("User", UsersSchema);
