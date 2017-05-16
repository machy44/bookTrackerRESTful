const apiRouter = require('express').Router();
const booksRouter = require('./books');
const shelvesRouter = require('./shelves');
const commentsRouter = require('./comments');
const bookShelvesRouter = require('./bookShelves');


apiRouter.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to booktracker api!'  });
});

//BOOKS, COMMENTS ROUTES
apiRouter.use('/books', booksRouter);
apiRouter.use('/books/:bookId/comments', commentsRouter);
//BOOK-SHELVES ROUTES
apiRouter.use('/books/:bookId/shelves', bookShelvesRouter); // rel shelves


//SHELVES ROUTES
apiRouter.use('/shelves', shelvesRouter);
apiRouter.use('/shelves/:shelfId/books', shelvesRouter); // rel new-book


module.exports = apiRouter;
