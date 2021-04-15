const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Course_has_user', {
    userID: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey:true,
      references: {
        model: 'User',
        key: 'username'
      }
    },
    courseID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      references: {
        model: 'Courses',
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
};
