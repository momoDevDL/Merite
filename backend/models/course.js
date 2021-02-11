const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return course.init(sequelize, DataTypes);
}

class course extends Sequelize.Model {
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
      allowNull: false
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
    tableName: 'course',
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
        name: "moduleID",
        using: "BTREE",
        fields: [
          { name: "moduleID" },
        ]
      },
    ]
  });
  return course;
  }
}
