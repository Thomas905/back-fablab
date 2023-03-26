const { DataTypes } = require('sequelize');
const sequelize = require('../database/db.js');
const Eleve = require("./eleve");
const Cours = require("./cours");
const Classe = require("./classe");

// Définition de la table presence de la base de données
const Presence = sequelize.define('presence', {
    id_presence: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    statut_presence: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    id_eleve: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'eleve',
            key: 'id_eleve'
        }
    },
    id_cours: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'cours',
            key: 'id_cours'
        }
    }
}, {
    tableName: 'presence',
    timestamps: false,
    defaultScope: {
        include: [Eleve, Cours],
        attributes: { exclude: ['id_eleve', 'id_cours'] }
    }
});

// Définition des relations entre les tables
Eleve.hasMany(Presence, { foreignKey: 'id_eleve' });
Presence.belongsTo(Eleve, { foreignKey: 'id_eleve' });

Cours.hasMany(Presence, { foreignKey: 'id_cours' });
Presence.belongsTo(Cours, { foreignKey: 'id_cours' });

module.exports = Presence;
