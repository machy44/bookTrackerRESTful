'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('books_shelves', [
    {
      book_id: '1',
      shelf_id: '1',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      book_id: '2',
      shelf_id: '2',
      created_at: new Date(),
      updated_at: new Date(),
    }
  ]);
  },

  down: function (queryInterface, Sequelize) {

      return queryInterface.bulkDelete('books_shelves', null, {});

  }
};
