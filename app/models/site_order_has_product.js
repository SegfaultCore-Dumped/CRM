module.exports = function(sequelize, DataTypes) {
  return sequelize.define('site_order_has_product', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    site_order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'site_order',
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
    price_total: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'site_order_has_product',
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
        name: "product_id",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "site_order_id",
        using: "BTREE",
        fields: [
          { name: "site_order_id" },
        ]
      },
    ]
  });
};