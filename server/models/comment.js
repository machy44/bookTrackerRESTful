'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    text:{
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    underscored: true,
    classMethods: {
      associate: (models) => {
        Comment.belongsTo(models.Book);
      }
    }
  });
  return Comment;
};
