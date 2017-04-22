const booksRouter = require('express').Router({mergeParams: true});
const Book = require('../server/models').Book;
const createCjTemplate = require('../helpers/mediaTypeObject');



// GET and POST collection books --> vracanje errora kada nema konekcije
 booksRouter.route('/')
    .get( (req, res) => {
        Book.findAll({limit:10, raw: true}).then(books=>{
          const base = 'http://' + req.headers.host;
          const path = base + req.baseUrl;
          let cj =  createCjTemplate(base, path);
          makingCollection(path);
          res.status(200).json(cj);
        }).catch(error => res.status(500).json( {msg: error.message, errors: error.errors}) );
  })

// POST book --create new book and add location header to created resource
    .post( (req, res) => {
      Book.create(req.body).then((book) => {
            res.status(201).append('Location', `books/${book.get('id')}`).json(book);//Location header get uri with new id of created book
        }).catch((error) => {
            res.status(400).json({msg: error.message, constraint: error.name, errors: error.errors});
        });
  });

//GET, PATCH and DELETE single book
booksRouter.route('/:bookId')
    .get((req, res) => {
        Book.findById(req.params.bookId).then((book) => {
            if (book) {
            res.status(200).json(book)
            }
            else {
            res.status(404).json( {msg: 'Not found'} );
           }
        });
    })
    .patch((req, res) => {
        Book.findById(req.params.bookId).then(book => {
          if (!book) {
            res.status(404).json( {msg: 'Not found'} );
          } else {
              book.updateAttributes(req.body).then(updatedBook => {
               res.status(200).json(updatedBook); //moze i 204 kada ne vraca content u bodyu
            });
          }
        });
    })
    .delete((req, res) => {
      Book.destroy({
        where: {id: req.params.bookId}
      })
      .then((book) => {
        if (book) {
          res.status(204).end();
        }
        else {
          res.status(404).json({msg: 'Not Found'});
        }
      });
    });


module.exports = booksRouter;
