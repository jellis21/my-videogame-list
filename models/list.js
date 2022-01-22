"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Team.belongsTo(models.User);
    }
  }
  List.init(
    {
      game_name: DataTypes.TEXT,
      ranking: DataTypes.TEXT,
      // UserId: DataTypes.INTEGER <-- don't need to reference anymore due to the associate method above
    },
    {
      sequelize,
      modelName: "List",
    }
  );
  return List;
};
