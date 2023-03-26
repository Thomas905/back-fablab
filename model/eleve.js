const { DataTypes } = require ('sequelize');
const sequelize = require ('../database/db.js');
const Classe = require ('./classe');
const Ecole = require ('./ecole');

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
    }
}, {
    tableName: 'eleve',
    timestamps: false,
    defaultScope: {
        include: [Classe, Ecole],
        attributes: { exclude: ['id_classe', 'id_ecole'] }
    }
});

Eleve.belongsTo (Classe, { foreignKey: 'id_classe' });
Eleve.belongsTo (Ecole, { foreignKey: 'id_ecole' });

module.exports = Eleve;