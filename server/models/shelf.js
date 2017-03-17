'use strict';
module.exports = function(sequelize, DataTypes) {
  var Shelf = sequelize.define('Shelf', {
    naziv: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Shelf.belongsToMany(models.Book, {
          through: 'book_shelves',
          as: 'Shelf',
          foreignKey: 'shelf_id'
        });
      }
    }
  });
  return Shelf;
};
