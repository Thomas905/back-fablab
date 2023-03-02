const { DataTypes } = require('sequelize');
const sequelize = require('../database/db.js');
const Utilisateur = require("./utilisateurs");
const Cours = require("./cours");
const Classe = require("./classe");

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
    id_utilisateur: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'utilisateur',
            key: 'id_utilisateur'
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
        include: [Utilisateur, Cours],
        attributes: { exclude: ['id_utilisateur', 'id_cours'] }
    }
});

Utilisateur.hasMany(Presence, { foreignKey: 'id_utilisateur' });
Presence.belongsTo(Utilisateur, { foreignKey: 'id_utilisateur' });

Cours.hasMany(Presence, { foreignKey: 'id_cours' });
Presence.belongsTo(Cours, { foreignKey: 'id_cours' });

module.exports = Presence;
