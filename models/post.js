"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: "userId" });
      Post.hasMany(
        models.Like,
        { foreignKey: "postId" },
        { onDelete: "CASCADE" }
      );
      Post.hasMany(
        models.Comment,
        { foreignKey: "postId" },
        { onDelete: "CASCADE" }
      );
      Post.hasMany(
        models.Report,
        { foreignKey: "postId" },
        { onDelete: "CASCADE" }
      );
    }
  }
  Post.init(
    {
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
