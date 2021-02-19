'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Role_has_Permission extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Role_has_Permission.init({
        roleID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        permissionID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Role_has_Permission',
    });
    Role_has_Permission.removeAttribute('id');
    return Role_has_Permission;
};