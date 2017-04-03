// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
const commentsRouter = require('express').Router({mergeParams: true});

// GET and POST on collection comments
commentsRouter.route('/')
    .get((req, res) => {// 200 else 204
    //res.send('book Id: ' + req.params.bookId + '!');
    res.status(200).json({ message: 'GET this new comments!' });
  })

    .post((req, res) => {//201 ili 400 sa bodyem koji objasnjava error
    //  res.send('book Id: ' + req.params.bookId + '!');
    res.status(200).json({ message: 'POST this is comments!'});
  });

// GET, PATCH and DELETE on single comment
commentsRouter.route('/:commentId')
    .get((req, res) => { //200 else 404
  //  res.send('book Id: ' + req.params.bookId + '!');
  //  res.status(200).json({ message: 'GET one comment!' });
      res.send('shelf Id: ' + req.params.shelfId + '!' + ' bookId: ' + req.params.bookId);
  })

    .patch((req, res) => {//200 else 404
    res.status(200).json({ message: 'PUT this is comments!' });
  })

  .delete((req, res) => {//204 else 404
    res.status(200).json({ message: 'DELETE this is comments!' });
  });

module.exports = commentsRouter;
