const mongoose = require("mongoose");

const connectDb = () => {
  try {
    mongoose.connect(
      process.env.DB_CONNECTION,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
      () => {
        console.log("Successfully connected to db");
      }
    );
  } catch (error) {
    process.exit(1);
  }
};

module.exports = connectDb;
