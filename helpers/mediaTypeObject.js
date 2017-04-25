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


//insert data in collection+json
function makingCollection(dataFromDb, path){

    for(let i=0; i<dataFromDb.length; i++ ){
      let item = {};
      item.href = path + '/' + dataFromDb[i].id;
      item.data = [];
      item.links = [];
      insertingDataToCollection(dataFromDb, item, i);
      insertingLinksToCollection(dataFromDb, item, path);
      cj.collection.items.push(item);
    }
};

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


function insertingLinksToCollection (dataFromDb, item, i, path){
  //console.log(item);
  const relBookItem = [['collection', '1'], ['read-comments', '2'], ['item', '3']];
  let linked = relBookItem;
  let linksNumbering=0;
  for(let i=0; i<linked.length; i++){
    for(let j=0; j<linked[i].length;j++)
        item.links[linksNumbering++] = {
        'rel': linked[i][j],
        'href': linked[j],
        'prompt': linked[i][j]
    }
  }
};


module.exports = {
  createCjTemplate, makingCollection, cj
};
