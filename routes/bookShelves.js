const bookShelvesRouter = require('express').Router( {mergeParams: true} );
const Shelf = require('../server/models').Shelf;
const Book = require('../server/models').Book;
const sequelize = require('../server/models').sequelize;
const collectionJSON = require('../helpers/mediaTypeObject');

//get /books/1/shelves // sve police u kojima je ta knjiga
//get /books/1/shelves/1 // da li postoji ta knjiga u shelfu
//put /books/1/shelves/1 //dodavo knjigu u policu koja vec postoji -> unsafe idempotent
//delete /books/1/shelves/1 // briso relaciju books shelves -> unsafe idempotent

bookShelvesRouter.route('/')
  .get((req, res) => {
    Book.findById(req.params.bookId).then( book => {
        if( !book ) return res.status(404).json( { msg: "book id does not exist" } );
    else { // see if this works
        let queryValue = 'SELECT shelves.id, shelves.name, shelves.created_at, shelves.updated_at \
        FROM shelves INNER JOIN books_shelves ON shelves.id = books_shelves.shelf_id WHERE books_shelves.book_id = :bookId';
        sequelize.query(queryValue, { replacements: { bookId: req.params.bookId }, type: sequelize.QueryTypes.SELECT }).then( shelves => {
          if (!shelves.length) return res.status(200).json( shelves );
          const json = collectionJSON( req.headers.host, '/api/shelves',  shelves , { query: false, template: false } );
          res.status(200).json( json );
        }).catch(error => res.status(404).json( { msg: "Not Found" } ) );
    }
  })
  .catch( error => {
    res.status(500).json({msg: error.message, constraint: error.name, errors: error.errors});
  });
});
// GET api/books/1/shelves/1  return true if association exists
bookShelvesRouter.route('/:shelfId(\\d+)')// if exists association in book_shelves
  .get( (req, res) => {
    let selectQueryValue = 'select book_id, shelf_id, created_at, updated_at from books_shelves where shelf_id = :shelfId and book_id = :bookId';
      sequelize.query( selectQueryValue, { replacements: { shelfId: req.params.shelfId, bookId: req.params.bookId }, type: sequelize.QueryTypes.SELECT })
      .then( selectQueryValue => {
        if(selectQueryValue.length)  res.status(200).json(); // if book exists in shelf
        else res.status(404).json( { msg: "Not Found" } );
      }).catch(error => res.status(404).json( { msg: "Not Found" } ) );
  })
// PUT api/books/1/shelves/1   association doesnt exists this request makes it
  .put( (req, res) => {// add association in books_shelves
        Book.findById(req.params.bookId).then( book =>
          {
            if(!book) return res.status(400).json( { msg: "Not Found"} );
            Shelf.findById(req.params.shelfId).then( shelf => {
                if(!shelf) return res.status(400).json( { msg: "Not Found"} );
                book.addShelf(shelf)
                .then( shelf => { res.status(200).json(); })
                .catch(error => res.status(400).json( { msg:  "Not Found" } ));
            })
          })
          .catch (error => {  res.status(500).json({msg: error.message, constraint: error.name, errors: error.errors});
        });
    })
// DELETE api/books/1/shelves/1   remove association
  .delete( (req, res) => {// delete association in books_shelves
    Book.findById(req.params.bookId).then( book =>
      {
        if(!book) return res.status(400).json( { msg: "Not Found"} );
        Shelf.findById(req.params.shelfId).then( shelf => {
            if(!shelf) return res.status(400).json( { msg: "Not Found"} );
            book.removeShelf(shelf)
            .then( shelf => { res.status(204).json(); })
            .catch(error => res.status(400).json( { msg:  "Not Found" } ));
        })
      })
      .catch (error => {  res.status(500).json({msg: error.message, constraint: error.name, errors: error.errors});
    });
});


module.exports = bookShelvesRouter;
