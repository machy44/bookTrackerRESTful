var express = require('express');

var app = express();



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
