const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Formations', {
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
    idResponsable: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'User',
        key: 'username'
      }
    }
  }, {
    sequelize,
    tableName: 'Formations',
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
        name: "idResponsable",
        using: "BTREE",
        fields: [
          { name: "idResponsable" },
        ]
      },
    ]
  });
};
