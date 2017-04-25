// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
const commentsRouter = require('express').Router({mergeParams: true});
const Comment = require('../server/models').Comment;
const collectionJSON = require('../helpers/mediaTypeObject');

// GET and POST on collection comments
commentsRouter.route('/')
.get( (req, res) => {
    Comment.findAll({where: {book_id: req.params.bookId}, limit:10, raw: true}).then(comments=>{
      const base = 'http://' + req.headers.host;
      const path = base + req.baseUrl;
      collectionJSON.createCjTemplate(base, path);
      collectionJSON.makingItem(comments, path); //i need to add read-comments rel
      res.status(200).json(collectionJSON.cj);
    }).catch(error => res.status(500).json( {msg: error.message, errors: error.errors}) );
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
