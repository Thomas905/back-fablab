const Utilisateur = require('../model/utilisateurs');
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const Role = require("../model/role");

exports.test = (req, res) => {
    Utilisateur.findOne({
        where: {
            login: req.body.login
        }
    })
        .then(user => {
            Role.findByPk(user.id_role).then(role => {
                res.status(200).send({
                    id: user.id,
                    login: user.login,
                    nom: user.nom,
                    prenom: user.prenom,
                    role: role.libelle_role,
                    id_groupe: user.id_groupe,
                    id_ecole: user.id_ecole,
                    id_classe: user.id_classe,
                    accessToken: jwt.sign({ id: user.id }, config.secret, {
                        expiresIn: 86400 // 24 hours
                    })
                });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


