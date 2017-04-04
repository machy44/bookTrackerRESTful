'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('comments', [
      {
        text: 'Aaauff sto je dobra knjiga.',
        book_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        text: 'Collection+json i druge tipove medija vidi',
        book_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      }
  ]);
  },

  down: function (queryInterface, Sequelize) {

      return queryInterface.bulkDelete('comments', null, {});

  }
};
