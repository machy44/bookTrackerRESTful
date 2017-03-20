const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const indexRoute = require('./routes');
const booksRoute = require('./routes/books');
const shelvesRoute = require('./routes/shelves');

var app = express();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', indexRoute);
app.use('/books', booksRoute);
app.use('/shelves', shelvesRoute);


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
