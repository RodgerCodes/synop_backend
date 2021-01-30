const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Code = require("../models/Code");
const jwt = require("jwt-simple");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("bruh");
});

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      res.send("User already exists");
    } else {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);

      const new_User = new User({
        name: req.body.name,
        email: req.body.email,
        district: req.body.district,
        password: hash,
      });

      let users = await new_User.save();
      res.send(users);
    }
  } catch (err) {
    console.error(err);
  }
});

router.post("/signin", (req, res) => {
  User.findOne(
    {
      email: req.body.email,
    },
    function (err, user) {
      if (err) throw err;
      if (!user) {
        res.status(403).send({ success: false, msg: "User not found" });
      } else {
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (isMatch && !err) {
            let token = jwt.encode(user, "fdsfsfsf");
            res.json({ success: true, token: token });
          } else {
            res.status(403).send({ success: false, msg: "Password incorrect" });
          }
        });
      }
    }
  );
});

router.get("/info", (req, res) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split("")[0] === "Bearer"
  ) {
    let token = req.headers.authorization.split("")[1];
    let decoded = jwt.decode(token, "fdsfsfsf");
    return res.json({ success: true, msg: "HEllo" + decoded.name });
  } else {
    return res.json({ success: false, msg: "No headers" });
  }
});

router.post("/code", (req, res) => {});

module.exports = router;
