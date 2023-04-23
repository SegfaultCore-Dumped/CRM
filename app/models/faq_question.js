module.exports = function(sequelize, DataTypes) {
  return sequelize.define('faq_question', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    update_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    creation_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    faq_question_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'faq_question_type',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'faq_question',
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
        name: "faq_question_type_id",
        using: "BTREE",
        fields: [
          { name: "faq_question_type_id" },
        ]
      },
    ]
  });
};
