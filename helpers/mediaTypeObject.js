const cjRouter = require('express').Router({mergeParams: true});
const Book = require('../server/models').Book;
const cj = {};
const friends = require('./friends');
/*
cjRouter.route('/')
   .get( (req, res) => {
     //Book.findAll();
     const base = 'http://' + req.headers.host;
     const path = base + req.baseUrl;
     createCjTemplate(base, path);
     makingCollection(path);
     //res.send(JSON.stringify(cj));
     res.status(200).json(cj);
 });
 */
function createCjTemplate(base, path) {
     cj.collection = {};
     cj.collection.version = "1.0";
     cj.collection.href = base;

     cj.collection.links = [];
     cj.collection.links.push({'rel':'home', 'href' : path});

     cj.collection.items = [];
     cj.collection.queries = [];
     cj.collection.template = {};
};

function makingCollection(path){
    let i, x, p;
    for(i=0; i<friends.length; i++ ){
      let item = {};
      item.href = path + '/' + friends[i].name;
      item.data = [];
      item.links = [];

      let d=0;
      let l=0;
      for (p in friends[i]) {
            if(p==='blog'){
              item.links[l++] = {
                'rel': 'alternate',
                'href': friends[i][p],
                'prompt': p
              }
            }
            else{
                item.data[d++] = {
                  'name': p,
                  'value': friends[i][p],
                  'prompt': p
                }
            }
        }
      cj.collection.items.push(item);
    }
};

module.exports = createCjTemplate;
