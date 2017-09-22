
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const db = require('./db/db');
const User = db.models.user;
const session = require('express-session');
const interact = require('./interact');
const app = express()

// general purpose middlewareo
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// configure and create our database store
// store session information on postgres database to restart without interrupting users
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db });

dbStore.sync();

//session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'fluffykins the doggy',
  store: dbStore,
  resave: false,
  saveUninitialized: true
}));

// app.use(require('./passport'))

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});

app.use(passport.initialize());
app.use(passport.session());

//serving routes
app.use('/api', require('./api'));

//errorhandling
app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err || 'Internal server error.');
});

// serve index.html for all non-api routes
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// process.env.PORT for deploying to Heroku or 3000 for local
const port = process.env.PORT || 1337; 

//change database every 10 seconds
setInterval(function(){console.log(Math.floor(Math.random()*10))},10000)

// sync our database
db.sync() 
  .then(function(){
  	// then start listening with our express server once we have synced
    app.listen(port, function () {
	  console.log(`Game Start: ${port}`);
	}) 
  });