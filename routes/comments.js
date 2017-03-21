// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
const router = require('express').Router({mergeParams: true});

router.get('/', (req, res) => {
  //res.send('book Id: ' + req.params.bookId + '!');
  res.status(200).json({ message: 'GET this new comments!' });
});

router.get('/:commentId', (req, res) => {
//  res.send('book Id: ' + req.params.bookId + '!');
//  res.status(200).json({ message: 'GET one comment!' });
    res.send('shelf Id: ' + req.params.shelfId + '!' + ' bookId: ' + req.params.bookId);
});
router.post('/', (req, res) => {
  //  res.send('book Id: ' + req.params.bookId + '!');
  res.status(200).json({ message: 'POST this is comments!'});
});

router.put('/:commentId', (req, res) => {
  res.status(200).json({ message: 'PUT this is comments!' });
});

router.delete('/:commentId', (req, res) => {
  res.status(200).json({ message: 'DELETE this is comments!' });
});

module.exports = router;
