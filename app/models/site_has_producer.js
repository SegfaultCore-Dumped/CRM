const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('site_has_producer', {
    site_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'site',
        key: 'id'
      }
    },
    producer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'producer',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'site_has_producer',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "site_id" },
          { name: "producer_id" },
        ]
      },
      {
        name: "producer_id",
        using: "BTREE",
        fields: [
          { name: "producer_id" },
        ]
      },
    ]
  });
};
