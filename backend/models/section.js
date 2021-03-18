const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return section.init(sequelize, DataTypes);
}

class section extends Sequelize.Model {
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
    courseID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'course',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'section',
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
        name: "courseID",
        using: "BTREE",
        fields: [
          { name: "courseID" },
        ]
      },
    ]
  });
  return section;
  }
}
