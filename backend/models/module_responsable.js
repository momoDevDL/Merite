const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return module_responsable.init(sequelize, DataTypes);
}

class module_responsable extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    userID: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'user',
        key: 'email'
      }
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
    tableName: 'module_responsable',
    timestamps: false,
    indexes: [
      {
        name: "userID",
        using: "BTREE",
        fields: [
          { name: "userID" },
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
  return module_responsable;
  }
}
