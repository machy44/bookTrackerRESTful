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
        text: 'security pogledaj i mongo db kako koristi.',
        book_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        text: 'Definiran Collection+json tip medija',
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
