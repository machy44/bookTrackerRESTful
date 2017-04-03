'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('books_shelves', {
        book_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'books',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'restrict'
        },
        shelf_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
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
