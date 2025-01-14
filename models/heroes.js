"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Heroes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Heroes.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
      Heroes.belongsTo(models.Type, {
        foreignKey: "user_id",
        as: "type",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }
  }
  Heroes.init(
    {
      name: DataTypes.STRING,
      photo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Heroes",
    }
  );
  return Heroes;
};
