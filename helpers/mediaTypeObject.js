const cjRouter = require('express').Router({mergeParams: true});
let cj = {};

function generatingCollectionJSONResponse (base, path, dataFromDb, opts){

     base = 'http://' + base ;
     path = base + path;
     console.log(base, path);

    createCjTemplate(base, path);
    makingItem(dataFromDb, path);
    if (opts.query) renderBooksQueries(dataFromDb, path);
    if (opts.template) renderTemplate(dataFromDb);

    return cj;
};

//create collection+json template
function createCjTemplate (base, path)  {
     cj.collection = {};
     cj.collection.version = "1.0";
     cj.collection.href = base;

     cj.collection.links = [];
     cj.collection.links.push({'rel':'home', 'href' : path});

     cj.collection.items = [];
     cj.collection.queries = [];
     cj.collection.template = {};
};

//making item in collection+json
function makingItem(dataFromDb, path){
    for(let i=0; i<dataFromDb.length; i++ ){
      const item = {};
      item.href = path + '/' + dataFromDb[i].id;
      item.data = [];
      item.links = [];
      insertingDataToCollection(dataFromDb, item, i);
      checkingResource(item, path);
      cj.collection.items.push(item);
    }
};
//inserting data to items
function insertingDataToCollection(dataFromDb,item, i){
  let dataNumbering=0;
  for (parameter in dataFromDb[i]) {
            item.data[dataNumbering++] = {
              'name': parameter,
              'value': dataFromDb[i][parameter],
              'prompt': parameter
            }
    }
};
//checking if the resource is book, comment or shelf for giving correct links
function checkingResource(item, path){
  const relBookItem = [
    ['collection', path],
    ['read-comments', item.href +'/comments'],
    ['item', item.href ],
    ['read-shelves', item.href + '/shelves' ]
  ];
  const relComments = [
    ['collection', path],
    ['read-book', path.slice(0,-9)], // cut out /comments from path
    ['item', item.href ]
  ];
  const relShelves =[
    ['collection', path],
    ['see-books', item.href + '/books'],
    ['item', item.href],
    //['new-book', item.href ]
  ];

 if(item.data[1].name==="title"){
    let linked = relBookItem;
    insertingLinksToCollection(item,linked)
  }
 else if(item.data[1].name==="text") {
    let linked = relComments;
    insertingLinksToCollection(item,linked);
  }
 else {
    let linked = relShelves;
    insertingLinksToCollection(item,linked);
  }
};
//function to insert links into collection of books, comments or shelves
function insertingLinksToCollection (item, linked) {
    let linksNumbering=0;
    for( let i=0; i<linked.length; i++ )   {
          item.links[linksNumbering++] = {
          'rel': linked[i][0],
          'href': linked[i][1],
          'prompt': linked[i][0]
      }
    }
 };

 //query for searching by author and year on books collection
 function renderBooksQueries(books, path) {
     const query = {};
     query.rel = "search";
     query.href = path + '/search'
     query.prompt = "search";
     query.data = [];
     query.data[0] = {
         'name' : 'author',
         'value' : '',
         'prompt' : 'search book by author ?author={value}'
     };
     query.data[1] = {
         'name' : 'year',
         'value' : '',
         'prompt' : 'search book by year ?year={value}'
     }
     cj.collection.queries.push(query);
 };

//making Template into collection for POST or PUT
function renderTemplate(dataFromDb) {
  let template = { data: [] };
  const blackList = ['id', 'created_at', 'updated_at', 'book_id']; // for doing filtering in array. you cant put/post this parameters and they will not be shown in template
// making array with keys from first object in  array and moving id, createdAt and UpdatedAt from array
  const arrayWithKeys = Object.keys(dataFromDb[0]).filter( (element, index) =>{
    return !blackList.includes(element);
  });
  //pushing data in template pattern
  arrayWithKeys.forEach( (element, index) => {
    //console.log(arrayWithKeys[index]);
    if(arrayWithKeys[index] === 'url'){
      let columnName = 'pdf';
      template.data.push( {
        'name': columnName,
        'value': "",
        'prompt': 'insert pdf file into book resource to store url in pdfs/{nameOfDocument}'
      } );
    }
    else {
      let columnName =  arrayWithKeys[index];
        template.data.push( {
          'name': columnName,
          'value': "",
          'prompt': columnName
        } );
    }
});

  cj.collection.template = template;

};

module.exports =  generatingCollectionJSONResponse;
