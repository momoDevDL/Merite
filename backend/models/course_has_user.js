const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return course_has_user.init(sequelize, DataTypes);
}

class course_has_user extends Sequelize.Model {
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
    tableName: 'Course_has_user',
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
        name: "courseID",
        using: "BTREE",
        fields: [
          { name: "courseID" },
        ]
      },
    ]
  });
  return course_has_user;
  }
}
