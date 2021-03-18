'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class role_has_permission extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    role_has_permission.init({
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
        modelName: 'role_has_permission',
    });
    role_has_permission.removeAttribute('id');
    return role_has_permission;
};