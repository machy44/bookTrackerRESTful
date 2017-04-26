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
    }
  ]);
  },

  down: function (queryInterface, Sequelize) {

      return queryInterface.bulkDelete('books', null, {});

  }
};
