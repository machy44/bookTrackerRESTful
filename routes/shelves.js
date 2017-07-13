const shelvesRouter = require('express').Router({ mergeParams: true });
const Shelf = require('../server/models').Shelf;
const sequelize = require('../server/models').sequelize;
const Book = require('../server/models').Book;
const collectionJSON = require('../helpers/mediaTypeObject');


shelvesRouter.route('/')
  .get((req, res) => {
    Shelf.findAll({ raw: true })
         .then(shelves => res.status(200).json(collectionJSON(req.headers.host, req.baseUrl, shelves, { query: false, template: true })))
         .catch(error => res.status(500).json({ msg: error.message, errors: error.errors }));
  })
  .post((req, res) => {
    Shelf.create(req.body)
         .then(shelf => res.status(201).append('Location', `shelves/${shelf.get('id')}`).end())
         .catch(error => res.status(400).json({msg: error.message, constraint: error.name, errors: error.errors}));
  });

shelvesRouter.route('/:shelfId(\\d+)')
  .get((req, res) => {
    Shelf.findById(req.params.shelfId, { raw: true })
         .then(shelf => res.status(200).json(collectionJSON(req.headers.host, req.baseUrl, [shelf], { query: false, template: true })))
         .catch( error => res.status(404).json({ msg: "Not Found" }));
  })
  .put((req, res) => {
    Shelf.findById( req.params.shelfId ).then(updateShelf => {
      if (!updateShelf)  return res.status(404).json({ msg: 'Not found' }); //if shelf with input id doesnt exist return not found
       else {
          updateShelf.updateAttributes({ name: req.body.name }).then(updatedShelf => {
            updatedShelf = updatedShelf.dataValues;
            res.status(200).json(collectionJSON( req.headers.host, req.baseUrl, [updatedShelf], {query: false, template: true} ));
        }).catch( error => res.status(404).json({ msg: 'Not found' }));
      }
    });
  })

  .delete((req, res) => {//204 else 404
    Shelf.findById(req.params.shelfId).then(shelf => {
       if (!shelf)   return res.status(404).json({ msg: 'Not found' }); //if book with input id doesnt exist return not found!
       else {
         Shelf.destroy({ where: { id: req.params.shelfId } })
         .then(deletedShelf =>  res.status(204).end() )
         .catch( error => res.status(404).json( { msg: 'Not found' } ) );
       }
    });
  });
//REQUESTS ON BOOKS IN SHELVES booksInShelves
shelvesRouter.route('/:shelfId(\\d+)/books')
  .get((req, res) => {
    let queryValue = 'SELECT books.id, books.title, books.author, books.isbn, books.publisher,  \
                      books.edition, books.pages, books.language, books.url, books.about, books.created_at, books.updated_at \
                      FROM books INNER JOIN books_shelves ON books.id = books_shelves.book_id WHERE books_shelves.shelf_id = :shelfId';
    sequelize.query(queryValue, { replacements: { shelfId: req.params.shelfId }, type: sequelize.QueryTypes.SELECT })
    .then(books => {  if(!books.length) return res.status(200).json(books);
    res.status(200).json(collectionJSON( req.headers.host, '/api/books',  books, { query: false, template: true }));})
    .catch(error => res.status(404).json({ msg: "Not Found" }));
  })
  .post((req, res) => { // create book in database and give association among book and shelf (books_shelves)
    Book.create(req.body)
        .then(book => {
          Shelf.findById(req.params.shelfId)
          .then( shelf => { if(!shelf) return res.status(400).json({ msg: "Not Found"});
           book.addShelf(shelf)
            .then( shelf => { res.status(204).json(); })
            .catch(error => res.status(400).json( { msg:  "Not Found" } ));
      })
          res.status(201).append('Location', `books/${book.get('id')}`).json();//Location header get uri with new id of created book
      }).catch( error => {
          res.status(400).json({msg: error.message, constraint: error.name, errors: error.errors});
      });
});

module.exports = shelvesRouter;
