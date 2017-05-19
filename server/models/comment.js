'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment:{
      type: DataTypes.STRING(255),
      field: 'text',
      allowNull: false,
      validate: {
        len: { args: 1, msg: "Comment must be at least 1 character in length"}
      }
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
