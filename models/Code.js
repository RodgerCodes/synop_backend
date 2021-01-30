const mongoose = require("mongoose");

const code_schema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("code", code_schema);
