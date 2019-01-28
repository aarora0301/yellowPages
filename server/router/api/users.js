const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');

const Users = mongoose.model('Users');
// const Users=require('../api/index');

// POST new user route (optional, everyone has access)
router.post('/', auth.optional, (req, res, next) => {
  // const { body: { user } } = req;

  if (!req.body.user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!req.body.user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = new Users(req.body.user);

  finalUser.setPassword(req.body.user.password);

  return finalUser.save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

// POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
  // const { body: { user } } = req;

  if (!req.body.user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!req.body.user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if (err) {
      return next(err);
    }

    if (passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }

    return status(400).info;
  })(req, res, next);
});

// GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return Users.findById(id)
    .then((user) => {
      if (!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
});

module.exports = router;
