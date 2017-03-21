const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const indexRouter = require('./routes');
const booksRouter = require('./routes/books');
const shelvesRouter = require('./routes/shelves');
const commentsRouter = require('./routes/comments')

var app = express();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//home page route
app.use('/', indexRouter);
// BOOKS ROUTES
app.use('/books', booksRouter);
app.use("/books/:bookId/comments", commentsRouter)

//SHELVES ROUTES
app.use('/shelves', shelvesRouter);



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
