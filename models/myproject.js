"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Myproject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Myproject.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }
  }
  Myproject.init(
    {
      name: DataTypes.STRING,
      sdate: DataTypes.DATE,
      edate: DataTypes.DATE,
      message: DataTypes.STRING,
      technologies: DataTypes.JSON,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Myproject",
    }
  );
  return Myproject;
};
