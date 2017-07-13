'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('books', [{
      title: 'Express in action',
      author: 'Evan M. Hahn',
      isbn: '9781617292422',
      publisher: 'Manning Publications Co',
      year: 2016,
      edition: '1',
      pages: '256',
      language: 'English',
      url: '/pdfs/Express_in_Action.pdf',
      about: " Express in Action is a carefully designed tutorial that teaches you how to build web applications using Node and Express. Express in Action teaches you how to build web applications using Node and Express. It starts by introducing Node's powerful traits and shows you how they map to the features of Express. You'll explore key development techniques, meet the rich ecosystem of companion tools and libraries, and get a glimpse into its inner workings. By the end of the book, you'll be able to use Express to build a Node app and know how to test it, hook it up to a database, and automate the dev process. ",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      title: 'RESTful Web APIs',
      author: 'Leonard Richardson, Mike Amundsen, Sam Ruby',
      isbn: '9781449358068',
      publisher: "O'Reilly Media",
      year: '2013',
      edition: '1',
      pages: '408',
      language: 'English',
      url: "/pdfs/RESTful_Web_APIs.pdf)",
      about: "Apply best practices for using HTTP in API implementations",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      title: 'Express in action',
      author: 'Evan M. Hahn',
      isbn: '9781617292423',
      publisher: 'Manning Publications Co',
      year: 2016,
      edition: '2',
      pages: '256',
      language: 'English',
      url: '/pdfs/Express_in_Action2.pdf',
      about: "a Express in Action is a carefully designed tutorial that teaches you how to build web applications using Node and Express. Express in Action teaches you how to build web applications using Node and Express. It starts by introducing Node's powerful traits and shows you how they map to the features of Express. You'll explore key development techniques, meet the rich ecosystem of companion tools and libraries, and get a glimpse into its inner workings. By the end of the book, you'll be able to use Express to build a Node app and know how to test it, hook it up to a database, and automate the dev process. ",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      author: 'Robert C. Martin',
      isbn: '978-0-13-235088-4',
      publisher: 'Pearson Education, Inc.',
      year: 2008,
      edition: '1',
      pages: '462',
      language: 'english',
      url: '/pdfs/Robert C. Martin-Clean Code_ A Handbook of Agile Software Craftsmanship-Prentice Hall (2008).pdf',
      about: `Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn’t have to be that way. Noted software expert Robert C. Martin presents a revolutionary paradigm with Clean Code: A Handbook of Agile Software Craftsmanship . Martin has teamed up with his colleagues from Object Mentor to distill their best agile practice of cleaning  code “on the fly” into a book that will instill within you the values of a software craftsman and make you a better programmer—but only if you work at it. What kind of work will you be doing? You’ll be reading code—lots of code. And you will be challenged to think about what’s right about that code, and what’s wrong with it. More importantly, you will be challenged to reassess your professional values and your commitment to your craft. Clean Code is divided into three parts. The first  describes the principles, patterns, and practices of writing clean code. The second part consists of several case studies of increasing complexity. Each case study is an exercise in cleaning up code—of transforming a code base that has some problems into one that is sound and efficient. The third part is the payoff: a single chapter containing a list of heuristics and “smells” gathered while creating the case studies. The result is a knowledge base that describes the way we think when we write, read, and clean code. Readers will come away from this book understanding How to tell the difference between good and bad codeHow to write good code and how to transform bad code into good codeHow to create good names, good functions, good objects, and good classesHow to format code for maximum readabilityHow to implement complete error handling without obscuring code logicHow to unit test and practice test-driven developmentThis book is a must for any developer, software engineer, project manager, team lead, or systems analyst with an interest in producing better code. `,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
  },

  down: function (queryInterface, Sequelize) {

      return queryInterface.bulkDelete('books', null, {});

  }
};
