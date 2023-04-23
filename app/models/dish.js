const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('dish', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        inventory_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'inventory',
                key: 'id'
            }
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        creation_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        update_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        dish_category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'dish_category',
                key: 'id'
            }
        },
        available_dishes_possible: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 12
        }
    }, {
        sequelize,
        tableName: 'dish',
        timestamps: false,
        underscored: true,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    {name: "id"},
                ]
            },
            {
                name: "inventory_id",
                using: "BTREE",
                fields: [
                    {name: "inventory_id"},
                ]
            },
            {
                name: "dish_category_id",
                using: "BTREE",
                fields: [
                    {name: "dish_category_id"},
                ]
            },
            {
                name: "dish_category_id_2",
                using: "BTREE",
                fields: [
                    {name: "dish_category_id"},
                ]
            },
        ]
    });
};