# bookTrackerRESTful (code for research paper)

UML state diagram how does interface of REST service returns links for HATEOAS.

Interface is built in Collection + JSON Hypermedia Type (http://amundsen.com/media-types/collection/).

State diagram is highly motivated by "RESTful Web API-s" book from Chapter "The Design Procedure" 
where authors talk about "Seven-Step Design Procedure" and how to build RESTful API.

Properties in JSON Object have generic names from Schema.org (https://schema.org/) and Link relations have names from 
IANA relations repository(https://www.iana.org/assignments/link-relations/link-relations.xhtml)

![statediagram](https://user-images.githubusercontent.com/7934791/27351425-9a68af34-55fd-11e7-8f30-78eeccaa3e2b.jpg)

REST service is built in Node js and Express js framework






