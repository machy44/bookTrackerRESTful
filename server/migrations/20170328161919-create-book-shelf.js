'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('books_shelves', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
        book_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'books',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'restrict'
        },
        shelf_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'shelves',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'restrict'
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
    return queryInterface.dropTable('book_shelves');
  }
};
