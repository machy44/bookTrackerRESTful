const router = require('express').Router();
const commentsRoute = require('./comments');

router.get('/', (req, res) => {
  res.status(200).json({ message: 'GET this is books!' });
});

router.post('/',  (req, res) => {
  res.status(200).json({ message: 'POST request to the books!' });
});

router.delete('/:bookid',  (req, res) => {
  res.status(200).json({ message: 'DELETE request to the books!' });
});

router.put('/:bookid',  (req, res) => {
  res.status(200).json({ message: 'PUT request to the books!' });
});

router.use('/:bookid/comments', commentsRoute);


module.exports = router;
