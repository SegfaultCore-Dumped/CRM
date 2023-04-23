module.exports = function(sequelize, DataTypes) {
  return sequelize.define('site', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    postal_code: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    town: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    billing_address: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    billing_postal_code: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    billing_town: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    vat_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    inventory_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'inventory',
        key: 'id'
      }
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    restaurant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'restaurant',
        key: 'id'
      }
    },
    has_auto_ordering: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    has_auto_cart_update: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    auto_ordering_interval: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'site',
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
        ]
      },
      {
        name: "restaurant_id",
        using: "BTREE",
        fields: [
          { name: "restaurant_id" },
        ]
      },
    ]
  });
};