const mongoose = require('mongoose');
const passport = require('passport');
const Strategy = require('passport-local');

const Users = mongoose.model('Users');
passport.use(new Strategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]',
}, (email, password, done) => {
  Users.findOne({ email })
    .then(user => done(null, user)).catch(done);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Users.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
