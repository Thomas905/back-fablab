const Cours = require('../model/cours');
const Classe = require("../model/classe");
const Utilisateur = require("../model/utilisateurs");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

exports.coursAll= (req, res) => {
    Cours.findAll()
        .then(cours => {
            res.status(200).send(cours);
        });
}

exports.coursByClasse = (req, res) => {
    Classe.findOne({
        where: {
            id_classe: req.params.id
        }
    })
    .then(classe => {
        Cours.findAll({
            where: {
                id_classe: classe.id_classe
            }
        })
            .then(cours => {
                res.status(200).send(cours);
            })
    })
}

exports.coursByUser = (req, res) => {
    Utilisateur.findOne({
        where: {
            login: req.params.login
        },
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
                        cours: cours
                    });
                })
                .catch(err => {
                    res.status(500).send({message: err.message});
                });
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
}