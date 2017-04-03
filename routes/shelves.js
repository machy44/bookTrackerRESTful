const shelvesRouter = require('express').Router();

// GET and POST on collection shelves
shelvesRouter.route('/')
  .get((req, res) => { //200 else 204
    res.status(200).json({ message: 'GET this is shelves!' });
  })

  .post((req, res) => {//201 ili 400 sa bodyem koji objasnjava error
    res.status(200).json({ message: 'POST request to the shelves!' });
  });

shelvesRouter.route('/:shelfId')
  .get((req, res) => {//200 else 404
    res.status(200).json({ message: 'GET this one shelf!' });
  })

  .patch((req, res) => {//200 else 404
    res.status(200).json({ message: 'PUT request to the shelves!' });
  })

  .delete((req, res) => {//204else 404
    res.status(200).json({ message: 'DELETE request to the shelves!' });
  });

//shelves/:shelfId/books

module.exports = shelvesRouter;
