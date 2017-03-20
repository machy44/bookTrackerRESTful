const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'GET this is books!' });
});

router.post('/',  (req, res) => {
  res.status(200).json({ message: 'POST request to the books!' });
});

router.delete('/:id',  (req, res) => {
  res.status(200).json({ message: 'DELETE request to the books!' });
});

router.put('/:id',  (req, res) => {
  res.status(200).json({ message: 'PUT request to the books!' });
});


module.exports = router;
