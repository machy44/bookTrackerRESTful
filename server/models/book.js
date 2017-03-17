'use strict';
module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define('Book', {
    naziv: DataTypes.STRING,
    autor: DataTypes.STRING,
    kategorija: DataTypes.STRING,
    isbn: DataTypes.STRING,
    izdavac: DataTypes.STRING,
    godina: DataTypes.INTEGER,
    izdanje: DataTypes.INTEGER,
    broj_stranica: DataTypes.INTEGER,
    jezik: DataTypes.STRING,
    url: DataTypes.STRING,
    opis: DataTypes.STRING
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        Book.hasMany(models.Comment);
        Book.belongsToMany(models.Shelf, {
          through: 'book_shelves',
          as: 'Book',
          foreignKey: 'book_id'
        });
      }
    }
  });
  return Book;
};
