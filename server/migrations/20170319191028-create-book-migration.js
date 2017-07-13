'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      author:{
        type: Sequelize.STRING(255),
        allowNull: false
      },
      isbn: {
        type: Sequelize.STRING(17),
        unique: true
      },
      publisher:{
        type: Sequelize.STRING(32),
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      edition: Sequelize.INTEGER,
      pages: Sequelize.INTEGER,
      language: {
        type: Sequelize.STRING(16),
      },
      url:{
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },
      about: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },{
      uniqueKeys: [{ // return this when title and edition are same
         name: 'You have that title with same edition in database',
         singleFields: false,
         fields: ['title', 'edition']
      }],
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('books');
  }
};
