const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User_Has_Formations', {
    idUser: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'User',
        key: 'username'
      }
    },
    idFormation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Formations',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'User_Has_Formations',
    timestamps: false,
    indexes: [
      {
        name: "idUser",
        using: "BTREE",
        fields: [
          { name: "idUser" },
        ]
      },
      {
        name: "idFormation",
        using: "BTREE",
        fields: [
          { name: "idFormation" },
        ]
      },
    ]
  });
};
