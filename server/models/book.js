'use strict';
//indexes on title and author and year
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    author:{
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
          min: { args: 1, msg: "Author cannot be blank"},
          max: { args: 254, msg: "Author name can only be 254 characters long." }
      }
    },
    isbn: {
      type: DataTypes.STRING(17),
      unique: {
          args: true,
          msg: 'Oops. Looks like you have a book with this ISBN.'
      }
    },
    publisher:{
      type: DataTypes.STRING
    },
    year: { //sredi godinu
      type: DataTypes.INTEGER,
      allowNull: false,
      validate :{
          min: {args: 0, msg: "only numbers from 0 till today date and must be 4 numbers long"},
          max: {args: 2017, msg: "only numbers from 0 till today date and must be 4 numbers long"}
      }
    },
    edition: DataTypes.INTEGER,
    pages: DataTypes.INTEGER,
    language: {
      type: DataTypes.STRING(32)
    },
    url:{
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: {
          args: true,
          msg: "Oops. Looks like you already have a book with this URL."
      },
      validate: {
          min: { args: 1, msg: "URL cannot be blank"},
          max: { args: 255, msg: "URL You entered is longer than 255 characters"}
    }
    },
    about: {
      type: DataTypes.STRING(767),
      allowNull: false,
      validate: {
          min: { args: 1, msg: " About cannot be blank." },
          max: { args: 767, msg: "About You entered is longer than 767 characters" }
      }
    }
  }, {
    underscored: true,
 // title and edition unique
    classMethods: {
      associate: (models) =>{
        Book.hasMany(models.Comment);
        Book.belongsToMany(models.Shelf, {through: 'book_shelves'});
      }
    }
  });
  return Book;
};
