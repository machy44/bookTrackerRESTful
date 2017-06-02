const apiRouter = require('express').Router();
const booksRouter = require('./books');
const shelvesRouter = require('./shelves');
const commentsRouter = require('./comments');
const bookShelvesRouter = require('./bookShelves');


apiRouter.get('/', (req, res) => {
  res.status(200).json({
    "message": 'Welcome to booktracker api!',
    "starting-point": req.headers.host + req.baseUrl,
    "list-books": req.headers.host + req.baseUrl + '/books',
    "list-shelves": req.headers.host + req.baseUrl + '/shelves',
  });
});

//BOOKS, COMMENTS ROUTES
apiRouter.use('/books', booksRouter);
apiRouter.use('/books/:bookId(\\d+)/comments', commentsRouter);
//BOOK-SHELVES ROUTES
apiRouter.use('/books/:bookId(\\d+)/shelves', bookShelvesRouter); // rel read-shelves


//SHELVES ROUTES
apiRouter.use('/shelves', shelvesRouter);
apiRouter.use('/shelves/:shelfId(\\d+)/books', shelvesRouter); // rel see-books

module.exports = apiRouter;
