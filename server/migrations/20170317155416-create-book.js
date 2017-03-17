'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      naziv: {
        type: Sequelize.STRING
      },
      autor: {
        type: Sequelize.STRING
      },
      kategorija: {
        type: Sequelize.STRING
      },
      isbn: {
        type: Sequelize.STRING
      },
      izdavac: {
        type: Sequelize.STRING
      },
      godina: {
        type: Sequelize.INTEGER
      },
      izdanje: {
        type: Sequelize.INTEGER
      },
      broj_stranica: {
        type: Sequelize.INTEGER
      },
      jezik: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      opis: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Books');
  }
};
