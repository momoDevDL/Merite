const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    return user.init(sequelize, DataTypes);
}

class user extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        super.init({
            username: {
                type: DataTypes.STRING(255),
                allowNull: false,
                primaryKey: true
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            idGlobalRole: {
                type: DataTypes.INTEGER,
                allowNull: false
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
                type: DataTypes.DATE,
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
            indexes: [{
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "username" },
                ]
            }, ]
        });
        return user;
    }
}