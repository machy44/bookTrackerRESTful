const booksRouter = require('express').Router( {mergeParams: true} );
const Book = require('../server/models').Book;
const Shelf = require('../server/models').Shelf;
const collectionJSON = require('../helpers/mediaTypeObject');
const multer = require('multer');
const fs = require('fs');
const pdfPaths = './public/pdfs/';

var upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => { cb(null, pdfPaths) },
    filename: (req, file, cb) => { cb(null, file.originalname) }
  }),
  fileFilter: (req, file, cb) => { file.mimetype === 'application/pdf' ? cb(null, true) : cb(new Error('Not a pdf')) }
 }).single('pdf');


booksRouter.get('/search', (req, res) => {
  if(Object.keys(req.query)=== 0) return res.status(200).json([]); // return empty array when query doesnt have parameters

  let keysObject = {};
  if(req.query.hasOwnProperty('author')){
    keysObject.author = { $like: `%${req.query.author}%` };
  };
  if(req.query.hasOwnProperty('datePublished')){
    keysObject.datePublished = { $like: `%${req.query.datePublished}%` };
  };

  Book.findAll({ where: keysObject, raw: true })
      .then(books => {
        if(books.length === 0) return res.status(200).json([]);
        res.status(200).json(collectionJSON(req.headers.host, req.baseUrl, books, { query: false, template: false }));
      })
      .catch(error => res.status(500).json({ msg: error.message, errors: error.errors  }));
});

 booksRouter.route('/')
    .get((req, res) => {
      Book.findAll( { raw: true })
          .then(books => res.status(200).json(collectionJSON(req.headers.host, req.baseUrl, books, { query: true, template: true} )))
          .catch(error => res.status(500).json({msg: error.message, errors: error.errors}));
    })
    .post((req, res) => {
      upload(req, res, function (err) {
        if (err) return res.status(400).json( { msg: 'file is not in pdf format' } );
        req.body.url = '/pdfs' + req.file.originalname;
        Book.create(req.body)
            .then(book => res.status(201).append('Location', `books/${book.get('id')}`).end())
            .catch(error => {
              fs.unlinkSync(pdfPaths + req.file.originalname);
              res.status(400).json({msg: error.message, constraint: error.name, errors: error.errors});
            });
      });
    });

booksRouter.route('/:bookId(\\d+)')
    .get((req, res) => {
      Book.findById(req.params.bookId, { raw: true })
          .then(book => res.status(200).json(collectionJSON(req.headers.host, req.baseUrl, [book], { query: false, template: true })))
          .catch(error => res.status(404).json({ msg: 'Not found' }));
    })
    .put((req, res) => {
      Book.update(req.body, { where: { id: req.params.bookId } })
          .then(updateBook => res.status(200).json(collectionJSON(req.headers.host, req.baseUrl, [updatedBook.dataValues], { query: false, template: true })))
          .catch(error => res.status(404).json({ msg: 'Not found' }));
    })
    .delete((req, res) => {
      Book.destroy({ where: { id: req.params.bookId } })
          .then(deletedBook => res.status(204).end())
          .catch(error => res.status(404).json({ msg: 'Not found' }));
      });

module.exports = booksRouter;
