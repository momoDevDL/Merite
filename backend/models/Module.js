const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Module', {
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
    parentIdModule: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Module',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Module',
    timestamps: false,
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
        name: "parentIdModule",
        using: "BTREE",
        fields: [
          { name: "parentIdModule" },
        ]
      },
    ]
  });
};
