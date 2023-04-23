const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('inventory_has_product', {
    inventory_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'inventory',
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
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    expiration_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    minimum_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    storage_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'storage_type',
        key: 'id'
      }
    },
    quantity_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'quantity_type',
        key: 'id'
      }
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'inventory_has_product',
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
        name: "inventory_id",
        using: "BTREE",
        fields: [
          { name: "inventory_id" },
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
        name: "storage_type_id",
        using: "BTREE",
        fields: [
          { name: "storage_type_id" },
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