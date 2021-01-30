const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const app = express();
const connectDb = require("./config/db");

dotenv.config({
  path: "./config/config.env",
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDb();
app.use(cors());
app.use(passport.initialize());
require("./config/passport")(passport);
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "fdsfsfsf",
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/", require("./routes/file"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
