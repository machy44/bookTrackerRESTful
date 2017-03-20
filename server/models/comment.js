'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    tekst: DataTypes.STRING
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        Comment.belongsTo(models.Book);
      }
    }
  });
  return Comment;
};
