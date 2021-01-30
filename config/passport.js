const JwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");

module.exports = function (passport) {
  let opts = {};
  opts.secretOrKey = "fdsfsfsf";
  opts.jwtFromRequest = extractJwt.fromAuthHeaderWithScheme("jwt");

  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      User.find(
        {
          id: jwt_payload.id,
        },
        function (err, user) {
          if (err) {
            return done(err, false);
          }

          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        }
      );
    })
  );
};
