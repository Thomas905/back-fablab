const { DataTypes } = require('sequelize');
const sequelize = require('../database/db.js');
const Role = require('./role');
const Groupe = require("./groupe");
const Ecole = require("./ecole");
const Classe = require("./classe");

const Utilisateur = sequelize.define('utilisateur', {
    id_utilisateur: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    login: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    nom: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    prenom: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    id_role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'role',
            key: 'id_role'
        },
    },
    id_groupe: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'groupe',
            key: 'id_groupe'
        }
    },
    id_ecole: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ecole',
            key: 'id_ecole'
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
    tableName: 'utilisateur',
    timestamps: false,
    defaultScope: {
        include: [Role, Groupe, Ecole, Classe],
        attributes: { exclude: ['id_role', 'id_groupe', 'id_ecole', 'id_classe'] }
    }
});

Utilisateur.belongsTo(Role, { foreignKey: 'id_role' });
Utilisateur.belongsTo(Groupe, { foreignKey: 'id_groupe' });
Utilisateur.belongsTo(Ecole, { foreignKey: 'id_ecole' });
Utilisateur.belongsTo(Classe, { foreignKey: 'id_classe' });


module.exports = Utilisateur;