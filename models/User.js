const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const user_schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  reset_password_token: {
    type: String,
    required: false,
  },
  profile_img: {
    type: String,
  },
});

user_schema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("user", user_schema);
