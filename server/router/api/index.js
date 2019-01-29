const express = require('express');

const router = express.Router();

router.use('/users', require('./users'));
router.use('/contacts', require('./contactsList'));

module.exports = router;
