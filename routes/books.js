const router = require('express').Router({mergeParams: true});
const Book = require('../server/models').Book;

router.get('/', (req, res) => {
  Book.findAll().then(books =>{
    res.status(200).json(books);
  });
});

router.post('/',  (req, res) => {
  Book.create(req.body)
    .then(book => res.status(200).json(book))
    .catch(error => {
      console.log(error);
      res.status(400).json({msg: error.message, constraint: error.name, errors: error.errors});
    });
});

router.get('/:bookId', (req, res) => {
  //res.status(200).json({ message: 'GET one book!' });
//res.send('shelf Id: ' + req.params.shelfId + '!');
});

router.delete('/:bookId',  (req, res) => {
  res.status(200).json({ message: 'DELETE request to the books!' });
});

router.put('/:bookId',  (req, res) => {
  res.status(200).json({ message: 'PUT request to the books!' });
});

module.exports = router;
