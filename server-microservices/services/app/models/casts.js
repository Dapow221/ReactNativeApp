"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Casts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Casts.belongsTo(models.Movie, {
        foreignKey: 'movieId'
      })
    }
  }
  Casts.init(
    {
      movieId: DataTypes.INTEGER,
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name required",
          },
          notEmpty: {
            msg: "Name required",
          },
        },
      },
      profilePict: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Casts",
    }
  );
  return Casts;
};
