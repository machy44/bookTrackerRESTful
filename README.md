# bookTrackerRESTful (code for research paper)

Based on Roy Fielding dissertation https://www.ics.uci.edu/~fielding/pubs/dissertation/fielding_dissertation.pdf chapter 5: Representational State Transfer (REST)

UML state diagram how does interface of REST service returns links for HATEOAS.

Interface is built in Collection + JSON Hypermedia Type (http://amundsen.com/media-types/collection/).

State diagram is highly motivated by "RESTful Web API-s" book from Chapter "The Design Procedure"
where authors talk about "Seven-Step Design Procedure" and how to build RESTful API.

Properties in JSON Object have generic names from Schema.org (https://schema.org/) and Link relations have names from
IANA relations repository(https://www.iana.org/assignments/link-relations/link-relations.xhtml) - Using collection (https://tools.ietf.org/html/rfc6573), item (https://tools.ietf.org/html/rfc6573) link types. Status codes are defined from https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml.

![statediagram](https://user-images.githubusercontent.com/7934791/27351425-9a68af34-55fd-11e7-8f30-78eeccaa3e2b.jpg)

REST API is built on Node.js and Express.js framework. Multer for pdfs upload. Sequelize ORM on MySql Database.

This is an API for listing of books from the user. BookTracker has a database of books comments and shelves.
With this API user can:
1. Keep track of the books in pdf format
2. Define shelves and put books in the shelves
3. Write comments about books (is there any good material for reading in specific book)
4. Search books from a specific author or year of book publication
