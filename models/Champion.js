const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Champion extends Model { }

Champion.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        champion: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        cost: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        trait1: { type: DataTypes.STRING },
        trait2: { type: DataTypes.STRING },
        trait3: { type: DataTypes.STRING },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'champion',
    }
);

module.exports = Champion;