// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
const commentsRouter = require('express').Router({ mergeParams: true });
const Comment = require('../server/models').Comment;
const Book = require('../server/models').Book;
const collectionJSON = require('../helpers/mediaTypeObject');

// GET and POST on collection comments--not found?
commentsRouter.route('/')
  .get((req, res) => {
    Comment.findAll({ where: { book_id: req.params.bookId }, raw: true })
        .then(comments => { if(!comments.length) return res.status(200).json(comments);
          res.status(200).json(collectionJSON(req.headers.host, req.baseUrl, comments, { query: false, template: true }));})
        .catch(error => res.status(500).json({ msg: error.message, errors: error.errors }));
  })
  .post((req, res) => {
    Book.findById(req.params.bookId)
        .then(book => { if(!book) return res.status(400).json({ msg: "book id doesnt exist" });
          book.createComment(req.body)
              .then(comment => res.status(201).append('Location', `books/${req.params.bookId}/comments/${comment.get('id')}`).end())
              .catch(error => res.status(400).json({ msg: error }));
        })
        .catch(error => res.status(500).json({ msg: error.message, constraint: error.name, errors: error.errors }));
    });

commentsRouter.route('/:commentId(\\d+)')
  .get((req, res) => {
    Comment.findAll({ where: { id: req.params.commentId , book_id: req.params.bookId }, raw: true })
           .then(comment => res.status(200).json(collectionJSON(req.headers.host, req.baseUrl, comment, { query: false, template: true })))
           .catch( error => res.status(404).json({ msg: "Not Found" }));
  })
  .put((req, res) => {
    Comment.update({ text: req.body.text }, { where: { id: req.params.commentId } })
           .then(updatedComment => res.status(200).json(collectionJSON(req.headers.host, req.baseUrl, [updatedComment], { query: false, template: true })))
           .catch(error => res.status(400).json({ msg: error }));
  })
  .delete((req, res) => {
    Comment.destroy({ where: { id: req.params.commentId } })
           .then(deletedBook => res.status(204).end())
           .catch(error => res.status(404).json({ msg: 'Not found' }));
  });

module.exports = commentsRouter;
