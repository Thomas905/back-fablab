const { DataTypes } = require ('sequelize');
const sequelize = require ('../database/db.js');
const Classe = require ('./classe');
const Ecole = require ('./ecole');

// Définition de la table eleve de la base de données
const Eleve = sequelize.define ('eleve', {
    id_eleve: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nom_eleve: {
        type: DataTypes.STRING (50),
        allowNull: false
    },
    prenom_eleve: {
        type: DataTypes.STRING (50),
        allowNull: false
    },
    id_classe: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'classe',
            key: 'id_classe'
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
    eleve_photo: {
        type: DataTypes.STRING (100),
        allowNull: true
    },
}, {
    tableName: 'eleve',
    timestamps: false,
    defaultScope: {
        include: [Classe, Ecole],
        attributes: { exclude: ['id_classe', 'id_ecole'] }
    }
});

// Définition des relations entre les tables
Eleve.belongsTo (Classe, { foreignKey: 'id_classe' });
Eleve.belongsTo (Ecole, { foreignKey: 'id_ecole' });

module.exports = Eleve;