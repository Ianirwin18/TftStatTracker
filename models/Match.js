const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Match extends Model { }

Match.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        place: {
            type: DataTypes.INTEGER
        },
        score: {
            type: DataTypes.INTEGER
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user"
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'match',
    }
);

module.exports = Match;