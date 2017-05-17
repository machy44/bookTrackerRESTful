// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
const commentsRouter = require('express').Router({ mergeParams: true });
const Comment = require('../server/models').Comment;
const Book = require('../server/models').Book;
const collectionJSON = require('../helpers/mediaTypeObject');

// GET and POST on collection comments--not found?
commentsRouter.route('/')
    .get( (req, res) => {
        Comment.findAll( { where: { book_id: req.params.bookId }, limit:10, raw: true } ).then( comments => { // comments of book id defined in url
          if(!comments.length) return res.status(200).json( comments );
          const json = collectionJSON( req.headers.host, req.baseUrl, comments, { query: false, template: true } );
          res.status(200).json( json );
        }).catch(error => res.status(500).json( {msg: error.message, errors: error.errors}) );
    })
    .post( (req, res) => {
    Book.findById(req.params.bookId).then( book => {
        if( !book ) return res.status(400).json( { msg: "book id is not valid" } ); // book id is not valid
        else {
          book.createComment(req.body)
              .then(comment => res.status(201).append('Location', `books/${req.params.bookId}/comments/${comment.get('id')}`).json())//Location header get uri with new id of created book
              .catch(error => res.status(400).json( { msg: error } ));
        }
    })
    .catch( error => {
      res.status(500).json({msg: error.message, constraint: error.name, errors: error.errors});
    });
  });
// GET, PATCH and DELETE on single comment
commentsRouter.route('/:commentId') // 400 bad request if bookId doesnt exist
    .get( (req, res) => { //200 else 404
       Comment.findAll( { where: {  id: req.params.commentId , book_id: req.params.bookId }, raw: true } ) // find comment by id for certain book
      .then( comment => {
        const json = collectionJSON( req.headers.host, req.baseUrl, comment, { query: false, template: true } );
        res.status(200).json( json );
      })
      .catch( error => res.status(404).json( { msg: "Not Found" } ) );
  })
    .patch( (req, res) => {
      Comment.findById(req.params.commentId).then( updateComment => {
        if( !updateComment ) return res.status(400).json( { msg: "comment id is not valid" } );
        else {
              updateComment.updateAttributes( { text: req.body.text } ) // update only text in comments
                .then( updatedComment => {
                  updatedComment = updatedComment.dataValues; //catch only dataValues of object
                  const json = collectionJSON( req.headers.host, req.baseUrl, [updatedComment], { query: false, template: true } );
                  res.status(200).json( json );
              })
              .catch( error => res.status(400).json( { msg: error } ) );
          }
        })
        .catch( error => {
            res.status(500).json( { msg: error.message, constraint: error.name, errors: error.errors } );
        });
    })
  .delete( (req, res) => {//204 else 404
    Comment.findById(req.params.commentId).then( comment => {
       if ( !comment )  return res.status(404).json( { msg: 'Not found' } ); //if book with input id doesnt exist return not found!
         else {
           Comment.destroy( { where: { id: req.params.commentId } } )
           .then( deletedComment => { res.status(204).end();  })     // 204 without entity in response body
           .catch( error => res.status(404).json( { msg: 'Not found' } ) );
         }
     })
       .catch( error => {
           res.status(500).json({msg: error.message, constraint: error.name, errors: error.errors});
      });
  });

module.exports = commentsRouter;
