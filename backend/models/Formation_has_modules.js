const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Formation_has_modules', {
    idFormation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Formations',
        key: 'id'
      }
    },
    idModule: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Module',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Formation_has_modules',
    timestamps: false,
    indexes: [
      {
        name: "idFormation",
        using: "BTREE",
        fields: [
          { name: "idFormation" },
        ]
      },
      {
        name: "idModule",
        using: "BTREE",
        fields: [
          { name: "idModule" },
        ]
      },
    ]
  });
};
