const mongoose = require("mongoose");

// user
const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
