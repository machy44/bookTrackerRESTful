const router = require('express').Router({mergeParams: true});
const Book = require('../server/models').Book;

router.get('/', (req, res) => {
  Book.findAll().then(books =>{
    res.status(200).json(books);
  });
});

router.post('/',  (req, res) => {
    Book.create(req.body).then((book) => {
        res.status(200).json(book)
      })
      .catch((error) => {
        res.status(400).json({msg: error.message, constraint: error.name, errors: error.errors});
      });
});

router.get('/:bookId', (req, res) => {
    Book.findById(req.params.bookId).then((book) => {
        if (book) {
        res.status(200).json(book)
        }
        else {
         res.status(404).json({msg: 'Not found'});
       }
    });
});

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

router.put('/:bookId',  (req, res) => {
  res.status(200).json({ message: 'PUT request to the books!' });
});

module.exports = router;
