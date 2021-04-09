const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User_has_roles', {
    roleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Roles',
        key: 'id'
      }
    },
    userID: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'User',
        key: 'username'
      }
    }
  }, {
    sequelize,
    tableName: 'User_has_roles',
    timestamps: false,
    indexes: [
      {
        name: "roleID",
        using: "BTREE",
        fields: [
          { name: "roleID" },
        ]
      },
      {
        name: "userID",
        using: "BTREE",
        fields: [
          { name: "userID" },
        ]
      },
    ]
  });
};
