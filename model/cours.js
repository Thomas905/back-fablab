const { DataTypes } = require('sequelize');
const sequelize = require('../database/db.js');
const Utilisateur = require('./utilisateurs');
const Classe = require("./classe");

const Cours = sequelize.define('cours', {
    id_cours: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nom_cours: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    date_cours: {
        type: DataTypes.DATE,
        allowNull: false
    },
    heure_debut: {
        type: DataTypes.TIME,
        allowNull: false
    },
    heure_fin: {
        type: DataTypes.TIME,
        allowNull: false
    },
    id_intervenant: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'utilisateur',
            key: 'id_utilisateur'
        }
    },
    id_classe: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'classe',
            key: 'id_classe'
        }
    }
    }, {
    tableName: 'cours',
    timestamps: false,
    defaultScope: {
        include: [Utilisateur, Classe],
        attributes: { exclude: ['id_intervenant', 'id_classe'] }
    }
});

Cours.belongsTo(Utilisateur, { foreignKey: 'id_intervenant' });
Cours.belongsTo(Classe, { foreignKey: 'id_classe' });

module.exports = Cours;