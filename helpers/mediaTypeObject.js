const cjRouter = require('express').Router({mergeParams: true});
const Book = require('../server/models').Book;
const cj = {};
//const friends = require('./friends');

//create collection+json template
let createCjTemplate = function (base, path) {
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
let makingCollection = function (dataFromDb, path){
    for(let i=0; i<dataFromDb.length; i++ ){
      let item = {};
      item.href = path + '/' + dataFromDb[i].id;
      item.data = [];
      item.links = [];
      insertingDataToCollection(dataFromDb, item, i);
      insertingLinksToCollection(dataFromDb, item, i);
      cj.collection.items.push(item);
    }
};

let insertingDataToCollection = function (dataFromDb,item, i){
  let dataNumbering=0;
  for (parameter in dataFromDb[i]) {
            item.data[dataNumbering++] = {
              'name': parameter,
              'value': dataFromDb[i][parameter],
              'prompt': parameter
            }
    }
};

let insertingLinksToCollection = function (dataFromDb, item, i){
  let linksNumbering=0;
  if(parameter==='blog'){
    item.links[linksNumbering++] = {
      'rel': 'alternate',
      'href': dataFromDb[i][parameter],
      'prompt': parameter
    }
  }
};

module.exports.createCjTemplate = createCjTemplate;
module.exports.makingCollection = makingCollection;
module.exports.cj = cj;
