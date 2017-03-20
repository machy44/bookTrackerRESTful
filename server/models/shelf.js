'use strict';
module.exports = function(sequelize, DataTypes) {
  var Shelf = sequelize.define('Shelf', {
    naziv: DataTypes.STRING
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        Shelf.belongsToMany(models.Book, {through: 'book_shelves'});
      }
    }
  });
  return Shelf;
};
