module.exports = function(sequelize, DataTypes) {
  return sequelize.define('site_order', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    site_order_status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'site_order_status',
        key: 'id'
      }
    },
    site_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'site',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'site_order',
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
        name: "site_order_status_id",
        using: "BTREE",
        fields: [
          { name: "site_order_status_id" },
        ]
      },
      {
        name: "site_id",
        using: "BTREE",
        fields: [
          { name: "site_id" },
        ]
      },
    ]
  });
};