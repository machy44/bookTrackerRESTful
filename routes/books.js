const router = require('express').Router({mergeParams: true});
//const commentsRouter = require('./comments');
router.get('/', (req, res) => {
  res.status(200).json({ message: 'GET this is books!' });
});

router.get('/:bookId', (req, res) => {
  //res.status(200).json({ message: 'GET one book!' });
    res.send('shelf Id: ' + req.params.shelfId + '!');
});

router.post('/',  (req, res) => {
  res.status(200).json({ message: 'POST request to the books!' });
});

router.delete('/:bookId',  (req, res) => {
  res.status(200).json({ message: 'DELETE request to the books!' });
});

router.put('/:bookId',  (req, res) => {
  res.status(200).json({ message: 'PUT request to the books!' });
});


module.exports = router;
