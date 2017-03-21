const router = require('express').Router();
const commentsRoute = require('./books');

router.get('/', (req, res) => {
  res.send('book Id: ' + req.params.bookId + '!');
  //res.status(200).json({ message: 'GET this is comments!' });
});

module.exports = router;
