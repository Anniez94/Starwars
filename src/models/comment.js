"use strict";
const sequelize = require("../config/index");
const { DataTypes, Model } = require("sequelize");

class Comment extends Model {}

Comment.init(
  {
    comments: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    episode_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
  }
);

module.exports = Comment;
