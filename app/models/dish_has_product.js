const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dish_has_product', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    dish_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'dish',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'quantity_type',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'dish_has_product',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "dish_id",
        using: "BTREE",
        fields: [
          { name: "dish_id" },
          { name: "product_id" },
        ]
      },
      {
        name: "product_id",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "quantity_type",
        using: "BTREE",
        fields: [
          { name: "quantity_type_id" },
        ]
      },
      {
        name: "quantity_type_id",
        using: "BTREE",
        fields: [
          { name: "quantity_type_id" },
        ]
      },
    ]
  });
};
