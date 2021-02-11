const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return user_has_role.init(sequelize, DataTypes);
}

class user_has_role extends Sequelize.Model {
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
    userID: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'user',
        key: 'email'
      }
    }
  }, {
    sequelize,
    tableName: 'user_has_role',
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
  return user_has_role;
  }
}
