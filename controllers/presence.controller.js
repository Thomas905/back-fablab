const Cours = require('../model/cours');
const Presence = require("../model/presence");

exports.presenceByCours = (req, res) => {
    Cours.findOne({
        where: {
            id_cours: req.params.id
        }
    })
        .then(cours => {
            Presence.findAll({
                where: {
                    id_cours: cours.id_cours
                },
            })
                .then(presence => {
                    res.status(200).send({
                        id: cours.id_cours,
                        nom: cours.nom_cours,
                        presence: presence
                    });
                })
                .catch(err => {
                    res.status(500).send({message: err.message});
                });
        })
}

exports.precenceCheck = (req, res) => {
    Presence.findOne({
        where: {
            id_cours: req.params.idcours,
            id_utilisateur: req.params.idetudiant
        }
    })

    .then(presence => {
        if (presence.cour.utilisateur.id_utilisateur === req.userId) {
            presence.update({
                statut_presence: req.params.statutpresence
            })
                .then(presence => {
                    res.status(200).send(presence);
                })
                .catch(err => {
                    res.status(500).send({message: err.message});
                });
        } else {
            res.status(403).send({message: "Vous n'êtes pas autorisé à modifier cette présence"});
        }
    })
}