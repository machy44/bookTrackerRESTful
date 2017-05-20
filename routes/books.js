const booksRouter = require('express').Router( {mergeParams: true} );
const Book = require('../server/models').Book;
const Shelf = require('../server/models').Shelf;
const collectionJSON = require('../helpers/mediaTypeObject');
/*

/search?q=abc&q=xyz --> then req.query.q will be the array ["abc", "xyz"].
var arrayWrap = require("arraywrap");
// …
app.get("/search", function(req, res) {
 var search = arrayWrap(req.query.q || "");
 var terms = search[0].split("+");
 // … do something with the terms …
});

Now, if someone gives you more queries than you expect, you just take the first one
and ignore the rest. This still works if someone gives you one query argument or no
query argument. Alternatively, you could detect if the query was an array and do something
different there.
*/

//search query finished
booksRouter.route('/search')
  .get ( (req, res) => {

    const dataLength = Object.keys(req.query)

    if(dataLength.length===0) return res.status(200).json(dataLength); // return empty array when query doesnt have parameters

    let keysObject = {};
    if(req.query.hasOwnProperty('author')){
      keysObject.author = { $like: `%${req.query.author}%` };
    };
    if(req.query.hasOwnProperty('datePublished')){
      keysObject.datePublished  =   { $like: `%${req.query.datePublished}%` };
    };

      Book.findAll({ where: keysObject, raw: true })
            .then( books=> {
              if(books.length===0) return res.status(404).json( {msg: 'Not found'} ); //if query data dont exists in db

              const json = collectionJSON( req.headers.host, req.baseUrl, books, { query: false, template: false } );
              res.status(200).json( json );

    }).catch( error => res.status(500).json( {msg: error.message, errors: error.errors}) );
  });

// GET and POST collection books --> returnin error where there is no connection
 booksRouter.route('/')
    .get( (req, res) => {
        Book.findAll( { raw: true })
        .then( books => {
          //console.log(books);
          const json = collectionJSON( req.headers.host, req.baseUrl, books, { query: true, template: true} );
          res.status(200).json( json );
        }).catch( error => res.status(500).json( {msg: error.message, errors: error.errors}) );
  })

// POST book --create new book and add location header to created resource // post on id must return error that u must create resource on collection
    .post( (req, res) => {
      Book.create(req.body).then( (book) => {
            res.status(201).append('Location', `books/${book.get('id')}`).json();//Location header get uri with new id of created book
        }).catch( error => {
            res.status(400).json({msg: error.message, constraint: error.name, errors: error.errors});
        });
  });

//GET, PATCH and DELETE single book
booksRouter.route('/:bookId(\\d+)')
    .get( (req, res) => {
      Book.findById( req.params.bookId, { raw: true } ).then( book => {
        const json = collectionJSON( req.headers.host, req.baseUrl, [ book ], { query: false, template: true } ); //sending book object in array
        res.status(200).json( json );
      }).catch( error => res.status(404).json( {msg: 'Not found'} ) );
    })
//sta sa PUTom diff between put and patch ==> if id created_at, updated_at cant update filter that
    .patch( (req, res) => {
        Book.findById( req.params.bookId ).then( updateBook => {
          if (!updateBook)  return res.status(404).json( {msg: 'Not found'} ); //if book with input id doesnt exist return not found
           else {
              updateBook.updateAttributes(req.body).then( updatedBook => {
                updatedBook = updatedBook.dataValues; //catch only dataValues object
                const json = collectionJSON( req.headers.host, req.baseUrl, [updatedBook], {query: false, template: true} ); //sending book object in array
                res.status(200).json( json ); //we can send 204 without entity in body
            }).catch( error => res.status(404).json( { msg: 'Not found' } ) );
          }
        });
    })
// delete done
    .delete( (req, res) => {
   Book.findById(req.params.bookId).then( book => {
      if (!book)   return res.status(404).json( { msg: 'Not found' } ); //if book with input id doesnt exist return not found!
      else {
        Book.destroy( { where: { id: req.params.bookId } } ).then( deletedBook => {
             res.status(204).end(); // 204 without entity in response body
           }).catch( error => res.status(404).json( { msg: 'Not found' } ) );
      }
   });
});


module.exports = booksRouter;
