const Utilisateur = require('../model/utilisateurs');
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const Role = require("../model/role");
const Cours = require("../model/cours");

exports.test = (req, res) => {
    Utilisateur.findOne({
        where: {
            login: req.body.login
        }
    })
        .then(user => {
                Cours.findAll({
                    where: {
                        id_intervenant: user.id_utilisateur
                    }
                })
                .then(cours => {
                    res.status(200).send({
                        id: user.id_utilisateur,
                        login: user.login,
                        nom: user.nom,
                        prenom: user.prenom,
                        accessToken: jwt.sign({ id: user.id }, config.secret, {
                            expiresIn: 86400 // 24 hours
                        }),
                        cours: cours
                    });
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


