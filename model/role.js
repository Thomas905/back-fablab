const { DataTypes } = require('sequelize');
const sequelize = require('../database/db.js');

const Role = sequelize.define('role', {
    id_role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    libelle_role: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    tableName: 'role',
    timestamps: false
});

module.exports = Role;