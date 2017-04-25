const apiRouter = require('express').Router();
const booksRouter = require('./books');
const shelvesRouter = require('./shelves');
const commentsRouter = require('./comments');
//const friends = require('../helpers/friends');
//let base = 'http://' + req.headers.host + req.baseUrl;

apiRouter.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to booktracker api!', base  });  
});




//BOOKS AND COMMENTS ROUTES
apiRouter.use('/books', booksRouter);
apiRouter.use('/books/:bookId/comments', commentsRouter);

//SHELVES ROUTES
apiRouter.use('/shelves', shelvesRouter);
apiRouter.use('/shelves/:shelfId/books', booksRouter);
//app.use('/shelves/:shelfId/books/:bookId/comments', commentsRouter);*/

module.exports = apiRouter;
