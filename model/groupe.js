const { DataTypes } = require('sequelize');
const sequelize = require('../database/db.js');

const Groupe = sequelize.define('groupe', {
    id_groupe: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nom_groupe: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
}, {
    tableName: 'groupe',
    timestamps: false
});

module.exports = Groupe;