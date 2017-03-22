'use strict';
module.exports = function(sequelize, DataTypes) {
  var Shelf = sequelize.define('Shelf', {
    name:{
      type: DataTypes.STRING,
      allowNull: false
    }
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
