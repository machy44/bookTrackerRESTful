'use strict';
module.exports = (sequelize, DataTypes)=> {
  const Shelf = sequelize.define('Shelf', {
    name:{
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: {
          args: true,
          msg: 'Oops. Looks like you have a shelf with that name.'
      },
      validate: {
          len: {  args: 1,  msg: "Shelf name must be at least 1 character in length" }
    }
  }
}, {
    underscored: true,
    classMethods: {
      associate: (models)=> {
        Shelf.belongsToMany(models.Book, {through: 'book_shelves'});
      }
    }
  });
  return Shelf;
};
