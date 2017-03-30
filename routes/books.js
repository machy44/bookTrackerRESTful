const router = require('express').Router({mergeParams: true});
const Book = require('../server/models').Book;

// GET all book
router.get('/', (req, res) => {
  Book.findAll().then(books =>{
    res.status(200).json(books);
  });
});

// POST book --create new book and add location header
router.post('/',  (req, res) => {
    Book.create(req.body).then((book) => {
        res.status(201).append('Location', `books/${book.get('id')}`).json(book);
      })
      .catch((error) => {
        res.status(400).json({msg: error.message, constraint: error.name, errors: error.errors});
      });
});

//GET single book
router.get('/:bookId', (req, res) => {
    Book.findById(req.params.bookId).then((book) => {
        if (book) {
        res.status(200).json(book)
        }
        else {
        res.status(404).json( {msg: 'Not found'} );
       }
    });
});

// PATCH single book
router.patch('/:bookId',  (req, res) => {
      Book.findById(req.params.bookId).then(book => {
        if (!book) {
          res.status(404).json( {msg: 'Not found'} );
        } else {
            book.updateAttributes(req.body).then(updatedBook => {
             res.status(200).json(updatedBook); //moze i 204 kada ne vraca content u bodyu
          });
        }
      });
});

// DELETE single book
router.delete('/:bookId',  (req, res) => {
  Book.destroy({
    where: {id: req.params.bookId}
  }).then((book) => {
    if (book) {
      res.status(204).end();
    }
    else {
      res.status(404).json({msg: 'Not Found'});
    }
  });
});


module.exports = router;
