const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'hooray! welcome to our api!'  });
});

module.exports = router;
