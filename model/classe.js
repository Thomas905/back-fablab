const { DataTypes } = require('sequelize');
const sequelize = require('../database/db.js');
const Ecole = require("./ecole");

const classe = sequelize.define('classe', {
    id_classe: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nom_classe: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    id_ecole: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ecole',
            key: 'id_ecole'
        }
    }
}, {
    tableName: 'classe',
    timestamps: false,
    defaultScope: {
        include: [Ecole],
        attributes: { exclude: ['id_ecole'] }
    }
});

classe.belongsTo(Ecole, { foreignKey: 'id_ecole' })

module.exports = classe;