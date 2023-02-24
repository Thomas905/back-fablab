const { DataTypes } = require('sequelize');
const sequelize = require('../database/db.js');
const Groupe = require("./groupe");

const Ecole = sequelize.define('ecole', {
    id_ecole: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nom_ecole: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    ville_ecole: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    adresse_ecole: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    id_groupe: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'groupe',
            key: 'id_groupe'
        }
    }
}, {
    tableName: 'ecole',
    timestamps: false
});

Ecole.belongsTo(Groupe, { foreignKey: 'id_groupe' });

module.exports = Ecole;
