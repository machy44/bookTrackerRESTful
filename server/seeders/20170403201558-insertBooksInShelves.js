'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('books_shelves', [
    {
      book_id: '1',
      shelf_id: '1'
    },
    {
      book_id: '2',
      shelf_id: '2'
    }
  ]);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
