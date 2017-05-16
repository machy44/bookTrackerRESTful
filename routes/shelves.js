const shelvesRouter = require('express').Router({ mergeParams: true });
const Shelf = require('../server/models').Shelf;
const sequelize = require('../server/models').sequelize;
const Book = require('../server/models').Book;
const collectionJSON = require('../helpers/mediaTypeObject');

// GET and POST on collection shelves
shelvesRouter.route('/')
    .get( (req, res) => {
        Shelf.findAll( { limit:10, raw: true } ).then( shelves => {
          const json = collectionJSON( req.headers.host, req.baseUrl, shelves, { query: false, template: true } );
          res.status(200).json( json );
        }).catch(error => res.status(500).json( {msg: error.message, errors: error.errors}) );
    })
  .post((req, res) => {//201 ili 400 sa bodyem koji objasnjava error
    Shelf.create(req.body).then( shelf => {
          res.status(201).append('Location', `shelves/${shelf.get('id')}`).json();//Location header get uri with new id of created book
      }).catch( error => {
          res.status(400).json({msg: error.message, constraint: error.name, errors: error.errors});
      });
  });

shelvesRouter.route('/:shelfId')
  .get((req, res) => {//200 else 404
    Shelf.findById(req.params.shelfId, { raw: true } )
   .then( shelf => {
     const json = collectionJSON( req.headers.host, req.baseUrl, [ shelf ], { query: false, template: true } );
     res.status(200).json( json );
   })
   .catch( error => res.status(404).json( { msg: "Not Found" } ) );
  })

  .patch((req, res) => {//200 else 404
    res.status(200).json({ message: 'PUT request to the shelves!' });
  })

  .delete((req, res) => {//204else 404
    res.status(200).json({ message: 'DELETE request to the shelves!' });
  });
//REQUESTS ON BOOKS IN SHELVES booksInShelves
//GET books in shelves
shelvesRouter.route('/:shelfId(\\d+)/books') // regexp to accept only numbers
  .get( (req, res) => {
    let queryValue = 'SELECT books.id, books.title, books.author, books.isbn, books.publisher,  \
                      books.edition, books.pages, books.language, books.url, books.about, books.created_at, books.updated_at \
                      FROM books INNER JOIN books_shelves ON books.id = books_shelves.book_id WHERE books_shelves.shelf_id = :shelfId';
      sequelize.query(queryValue, { replacements: { shelfId: req.params.shelfId }, type: sequelize.QueryTypes.SELECT }).then( books => {
        const json = collectionJSON( req.headers.host, req.baseUrl,  books , { query: false, template: true } );
        res.status(200).json( json );
      }).catch(error => res.status(404).json( { msg: "Not Found" } ) );
  })

module.exports = shelvesRouter;
