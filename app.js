const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

// initiate app
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'passport', cookie: { maxAge: 6000 }, resave: false, saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// configure mongoose
mongoose.connect('mongodb://localhost/yellow-pages', { useNewUrlParser: true });
mongoose.set('debug', true);

// Models & Routes
require('./server/models/Users');
require('./server/models/ContactsList')
require('./server/config/passport');
app.use(require('./server/router/index'));

/*
Enhancement : Implement error Handler
app.use((err,req,res)=>{
  res.status(err.statusCode || 500);
  res.json({
    errors:{
      message: err.statusMessage,
      error:{}
    },
  });
});
*/

// run app on port 8070
app.listen(8070, () => console.log('Server running on http://localhost:8070/'));
