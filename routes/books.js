const router = require('express').Router();
const commentsRoute = require('./comments');

router.get('/', (req, res) => {
  res.status(200).json({ message: 'GET this is books!' });
});

router.get('/:bookId', (req, res) => {
  res.status(200).json({ message: 'GET this one book!' });
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
//---------------COMMENTS ROUTES------------------------

router.get('/:bookId/comments', (req, res) => {
  res.send('book Id: ' + req.params.bookId + '!');
  //res.status(200).json({ message: 'GET this is comments!' });
});

router.get('/:bookId/comments/:commentId', (req, res) => {
  res.send('book Id: ' + req.params.bookId + '!');
  //res.status(200).json({ message: 'GET one comment!' });
});

router.post('/:bookId/comments/', (req, res) => {
  res.status(200).json({ message: 'POST this is comments!' });
});

router.put('/:bookId/comments/:commentId', (req, res) => {
  res.status(200).json({ message: 'PUT this is comments!' });
});

router.delete('/:bookId/comments/:commentId', (req, res) => {
  res.status(200).json({ message: 'DELETE this is comments!' });
});


module.exports = router;
