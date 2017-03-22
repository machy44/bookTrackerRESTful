'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    text:{
      type: DataTypes.STRING,
      allowNull: false
    }
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
