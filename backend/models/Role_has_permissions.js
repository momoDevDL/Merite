const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Role_has_permissions', {
    roleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Roles',
        key: 'id'
      }
    },
    permissionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Permissions',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Role_has_permissions',
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
        name: "permissionID",
        using: "BTREE",
        fields: [
          { name: "permissionID" },
        ]
      },
    ]
  });
};
