const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return role_has_permission.init(sequelize, DataTypes);
}

class role_has_permission extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    roleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'role',
        key: 'id'
      }
    },
    permissionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'permission',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'role_has_permission',
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
  return role_has_permission;
  }
}
