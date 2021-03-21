const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return document.init(sequelize, DataTypes);
}

class document extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
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
    message: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    filepath: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sectionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'section',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Document',
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
        name: "sectionID",
        using: "BTREE",
        fields: [
          { name: "sectionID" },
        ]
      },
    ]
  });
  return document;
  }
}
