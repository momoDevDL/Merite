const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    idGlobalRole: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Global_Roles',
        key: 'id'
      }
    },
    numEtud: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    formation: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    INE: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phoneNumber: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    town: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    pinCode: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'User',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "username" },
        ]
      },
      {
        name: "idGlobalRole",
        using: "BTREE",
        fields: [
          { name: "idGlobalRole" },
        ]
      },
    ]
  });
};
