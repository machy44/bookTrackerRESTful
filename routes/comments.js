// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
const commentsRouter = require('express').Router({mergeParams: true});
const Comment = require('../server/models').Comment;
const Book = require('../server/models').Book;
const collectionJSON = require('../helpers/mediaTypeObject');

// GET and POST on collection comments
commentsRouter.route('/')
    .get( (req, res) => {
        Comment.findAll( { where: { book_id: req.params.bookId }, limit:10, raw: true } ).then( comments => {
          const json = collectionJSON( req.headers.host, req.baseUrl, comments, { query: false, template: true } );
          res.status(200).json( json );
        }).catch(error => res.status(500).json( {msg: error.message, errors: error.errors}) );
    })
    .post((req, res) => {
    Book.findById(req.params.bookId).then( book => {
        if( !book ) return res.status(400).json( { msg: "book id is not valid" } );
        else {
          book.createComment(req.body)
              .then(comment => res.status(201).append('Location', `books/${req.params.bookId}/comments/${comment.get('id')}`).json())//Location header get uri with new id of created book
              .catch(error => res.status(400).json( { msg: error } ));
        }
    })
    .catch((error) => {
      res.status(500).json({msg: error.message, constraint: error.name, errors: error.errors});
    });
  });

// GET, PATCH and DELETE on single comment
commentsRouter.route('/:commentId')
    .get( (req, res) => { //200 else 404
      Comment.findAll( { where: {  id: req.params.commentId , book_id: req.params.bookId }, raw: true } ).then( comment => {
        const json = collectionJSON( req.headers.host, req.baseUrl, comment, { query: false, template: true } );
        res.status(200).json( json );
      }).catch( error => res.status(404).json( { msg: "Not Found" } ) );
  })

    .patch((req, res) => {//200 else 404
    res.status(200).json({ message: 'PUT this is comments!' });
  })

  .delete((req, res) => {//204 else 404
    res.status(200).json({ message: 'DELETE this is comments!' });
  });

module.exports = commentsRouter;
