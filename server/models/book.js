'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    author:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: 1
      }
    },
    isbn:DataTypes.STRING,
    publisher:{
      type: DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    edition: DataTypes.INTEGER,
    pages: DataTypes.INTEGER,
    language: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url:{
      type: DataTypes.STRING,
      allowNull: false
    },
    about: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    underscored: true,
    classMethods: {
      associate: (models) =>{
        Book.hasMany(models.Comment);
        Book.belongsToMany(models.Shelf, {through: 'book_shelves'});
      }
    }
  });
  return Book;
};
