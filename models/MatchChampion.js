const sequelize = require("../config/connection");
const { DataTypes, Model } = require("sequelize");
class MatchChamp extends Model {}

MatchChamp.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    match_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "match",
        key: "id",
      },
      unique: false,
    },
    champion_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "champion",
        key: "id",
      },
      unique: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "match_champion",
  }
);

module.exports = MatchChamp;
