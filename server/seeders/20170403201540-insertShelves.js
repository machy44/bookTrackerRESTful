'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('shelves', [
    {
      name: 'JS programming language.',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'REST servisi',
      created_at: new Date(),
      updated_at: new Date(),
    }
  ]);
  },

  down: function (queryInterface, Sequelize) {

      return queryInterface.bulkDelete('shelves', null, {});

  }
};
