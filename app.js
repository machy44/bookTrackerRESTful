const express = require('express');
const logger = require('morgan');
const fs = require("fs");
const path = require("path");
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api');
//Recall that path.resolve helps keep your path resolution cross-platform (things are different on Windows and Mac and Linux)
const publicPath = path.resolve(__dirname, "public");
const cType = 'application/vnd.collection+json';
const createCjTemplate = require('./MediaTypeScheme/mediaTypeObject');


const app = express();


// configure app to use bodyParser(). this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//morgan logger
app.use(logger("combined"));

app.use('/', express.static(publicPath));
//
//SET TO COLLECTION + JSON CONTENT TYPE and skeleton
app.use((req, res, next) => {
  createCjTemplate();
  res.set('Content-Type', cType);
  next();
});


//ROUTES
app.use('/api', apiRouter);




// catch 404 and forward to error handler
app.use( (req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use( (err, req, res, next) => {
  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
