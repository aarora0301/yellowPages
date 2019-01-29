const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');

const ContactsList = mongoose.model('ContactsList');

router.post('/', auth.required, (req, res, next) => {
  if (!req.body.name) {
    return res.status(422).json({
      errors: {
        name: 'is required',
      },
    });
  }

  if (!req.body.createdBy) {
    return res.status(422).json({
      errors: {
        createdBy: 'is required',
      },
    });
  }

  if (!req.body.createdAt) {
    return res.status(422).json({
      errors: {
        createdAt: 'is required',
      },
    });
  }

  if (!req.body.type) {
    return res.status(422).json({
      errors: {
        type: 'is required',
      },
    });
  }

  const contactsList = new ContactsList(req.body);
  return contactsList.save()
    .then(result => res.json({ message: 'list saved successfully', id: result.id })).catch(err => res.json({ message: 'not able to save list' }));
});

router.get('/', auth.required, (req, res, next) => ContactsList.find({ type: 'public' }, (err, contactsList) => {
  if (err) {
    return res.json({ message: 'not able to save list' });
  }
  // return res.json{contacts:contactsList};
  res.send(contactsList);
}));

module.exports = router;
