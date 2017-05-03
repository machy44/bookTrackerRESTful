const booksRouter = require('express').Router({mergeParams: true});
const Book = require('../server/models').Book;
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

//search query
booksRouter.route('/search')
  .get ((req, res) => {
    if(Object.keys(req.query).length===0) return res.status(200).json(Object.keys(req.query)); // return empty array when query doesnt have parameters
    let keysObject = {};
    if(req.query.hasOwnProperty('author')){
      keysObject.author = {$like: `%${req.query.author}%` };
    };
    if(req.query.hasOwnProperty('year')){
      keysObject.year  =   {$like: `%${req.query.year}%` };
    };
      Book.findAll({ where: keysObject, raw: true })
            .then(books=> {
              const base = 'http://' + req.headers.host;
              const path = base + req.baseUrl;
              collectionJSON.createCjTemplate(base, path);
              collectionJSON.makingItem(books, path);
              res.status(200).json(collectionJSON.cj);
    }).catch(error => res.status(500).json( {msg: error.message, errors: error.errors}) );
  });

// GET and POST collection books --> vracanje errora kada nema konekcije
 booksRouter.route('/')
    .get( (req, res) => {
        Book.findAll({limit:10, raw: true}).then(books=>{
          const base = 'http://' + req.headers.host;
          const path = base + req.baseUrl;
          collectionJSON.createCjTemplate(base, path); //ovo u jednu funkciju ubaciti
          collectionJSON.makingItem(books, path);
          collectionJSON.renderBooksQueries(books, path);
          collectionJSON.renderTemplate(books);
          res.status(200).json(collectionJSON.cj);
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
      Book.findById(req.params.bookId,{ raw: true }).then(book => {
        const base = 'http://' + req.headers.host;
        const path = base + req.baseUrl;
        collectionJSON.createCjTemplate(base, path);
        collectionJSON.makingItem([book], path);
        res.status(200).json(collectionJSON.cj);
      }).catch( error => res.status(404).json( {msg: 'Not found'} ) );
    })
//ispraviti patch i delete da rade sa promisima then/catch
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
