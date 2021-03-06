'use strict';
//indexes on title and author and year
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book',
  {
      title: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      author:{
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            len: { args: 1, msg: "Author cannot be blank"},
            //max: { args: 254, msg: "Author name can only be 254 characters long." }
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
        type: DataTypes.STRING(32),
      },
      year: { //datePublished will show in interface
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            //min: {args: 0, msg: "only numbers from 0 till today date and must be 4 numbers long"},
            //max: {args: 2017, msg: "only numbers from 0 till today date and must be 4 numbers long"}
            len: 4
          }
      },
      bookEdition: {
        type: DataTypes.INTEGER,
        field: 'edition'
      },
      numberOfPages: {
        type: DataTypes.INTEGER,
        field: 'pages'
      },
      inLanguage: {
        type: DataTypes.STRING(16),
        field: 'language'
      },
      url:{
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: {
            args: true,
            msg: "Oops. Looks like you already have a book with this URL."
        },
        validate: {
          //  len: { args: 1, msg: "URL cannot be blank"},
          len: 1
      }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'about',
        validate: {
            len: { args: 1, msg: " About cannot be blank." },
            //max: { args: 767, msg: "About You entered is longer than 767 characters" }
        }
      }
  },
  {
    underscored: true,
    //freezeTableNames: true,
    indexes: [ { unique: true, fields: ['title', 'edition'] } ],
    classMethods: {
      associate: (models) => {
        Book.hasMany( models.Comment );
        Book.belongsToMany( models.Shelf, { through: 'books_shelves' } );
      }
    }
  });
  return Book;
};
