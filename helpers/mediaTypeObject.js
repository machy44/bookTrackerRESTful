/*sample collection object -level document property.
{
  "collection" :
  {
    "version" : "1.0",
    "href" : URI,
    "links" : [ARRAY],
    "items" : [ARRAY],
    "queries" : [ARRAY],
    "template" : {OBJECT},
    "error" : {OBJECT}
  }
}
*/
const cj = JSON.parse(`
  { "collection" :
      {
        "version": "1.0",
        "items": [],
        "queries": [],
        "template": {},
        "error": {}
      }
  }`
);
console.log(cj);
