const express = require('express');
const logger = require('morgan');
const fs = require("fs");
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api');

const app = express();

const staticPath = path.join(__dirname, "/public/pdfs");

app.use(express.static(staticPath));
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(logger("combined"));

//API ROUTER
app.use('/api', apiRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
