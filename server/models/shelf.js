'use strict';
module.exports = (sequelize, DataTypes)=> {
  const Shelf = sequelize.define('Shelf', {
    name:{
      type: DataTypes.STRING,
      allowNull: false
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
