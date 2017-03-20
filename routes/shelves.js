const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'GET this is shelves!' });
});

router.post('/',  (req, res) => {
  res.status(200).json({ message: 'POST request to the shelves!' });
});

router.delete('/:id',  (req, res) => {
  res.status(200).json({ message: 'DELETE request to the shelves!' });
});

router.put('/:id',  (req, res) => {
  res.status(200).json({ message: 'PUT request to the shelves!' });
});

module.exports = router;
