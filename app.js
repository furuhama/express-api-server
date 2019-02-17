// === Initialize Express & Sequelize ===

var express = require("express");
var app = express();

const Sequelize = require("sequelize");
const sequelize = new Sequelize('sample_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  operatorAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// === Define models ===

const Language = sequelize.define('languages', {
  name: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  }
});

// Create seed data before server starts
//
// MEMO: This is not good practice.
// However, I think it is better to be more simple and easier to understand this app.
Language.sync({ force: true }).then(() => {
  Language.create({
    name: 'Ruby',
    type: 'Dynamic'
  });

  Language.create({
    name: 'Rust',
    type: 'Static'
  });
});

// == Start Server ===

// Start server with port 3000
var server = app.listen(3000, function(){
  console.log("Express Server is listening to PORT: " + server.address().port);

  // Check mysql database connection
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database: ', err);
    });
});

// === Define middleware for a console logger ===

app.use(function(req, res, next) {
  console.log("protocol: " + req.protocol);
  console.log("method: " + req.method);
  console.log("originalUrl: " + req.originalUrl);
  console.log("hostname: " + req.hostname);
  console.log("body: " + req.body);

  next()
});

// === Define Routings ===

// languages#index
app.get("/api/languages", function(req, res, next) {
  Language.findAll()
    .then(languages => {
      res.json(languages);
    })
    .catch(err => {
      console.error('Failed to get data from database: ', err);
    });
});

// languages#show
app.get("/api/languages/:languageId", function(req, res, next) {
  Language.findByPk(req.params.languageId)
    .then(language => {
      res.json(language);
    })
    .catch(err => {
      console.error('Failed to get data from database: ', err);
    });
});
