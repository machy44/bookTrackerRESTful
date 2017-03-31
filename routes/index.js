const router = require('express').Router();
const booksRouter = require('./books');
const shelvesRouter = require('./shelves');
const commentsRouter = require('./comments');

router.get('/', (req, res) => {
  res.status(200).json({ message: 'hooray! welcome to our api!'  });
});
//BOOKS AND COMMENTS ROUTES
app.use('/books', booksRouter);
app.use('/books/:bookId/comments', commentsRouter);
//SHELVES
app.use('/shelves', shelvesRouter);
app.use('/shelves/:shelfId/books', booksRouter);
//app.use('/shelves/:shelfId/books/:bookId/comments', commentsRouter);

module.exports = router;
