const cjRouter = require('express').Router({mergeParams: true});
const cj = {};

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
function makingItem(dataFromDb, path, base){
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
    ['item', item.href ]
  ];
  const relComments = [
    ['collection', path],
    ['read-book', path.slice(0,-9)], // cut out /comments from path
    ['item', item.href ]
  ];
  const relShelves =[];
 if(item.data[1].name==="title"){
    let linked = relBookItem;
    insertingLinksToCollection(item,linked)
  }else if(item.data[1].name==="text"){
    let linked = relComments;
    insertingLinksToCollection(item,linked);
  }
  else{
    let linked = relShelves;
    insertingLinksToCollection(item,linked);
  }
};
//function to insert links into collection of books, comments or shelves
function insertingLinksToCollection (item, linked){
    let linksNumbering=0;
    for(let i=0; i<linked.length; i++){
          item.links[linksNumbering++] = {
          'rel': linked[i][0],
          'href': linked[i][1],
          'prompt': linked[i][0]
      }
    }
 };

 //query for searching by author and year on books collection
 function renderBooksQueries(books, path){
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
function renderTemplate(dataFromDb){
  let template = { data: [] };
  const blackList = ['id', 'created_at', 'updated_at']; // for doing filtering in array
// making array with keys from first object in  array and moving id, createdAt and UpdatedAt from array
  const arrayWithKeys = Object.keys(dataFromDb[0]).filter((element, index)=>{
    return !blackList.includes(element);
  });
  arrayWithKeys.forEach((element, index)=>{
    const columnName =  arrayWithKeys[index];
    template.data.push({
      'name': columnName,
      'value': "",
      'prompt': columnName
    });
  });
  cj.collection.template = template;
};

module.exports = {
  createCjTemplate, makingItem, cj, renderBooksQueries, renderTemplate
};
