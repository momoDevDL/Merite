const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Courses', {
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
    moduleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Module',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Courses',
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
        name: "moduleID",
        using: "BTREE",
        fields: [
          { name: "moduleID" },
        ]
      },
    ]
  });
};
