const Cours = require('../model/cours');
const Presence = require("../model/presence");
const Eleve = require("../model/eleve");

exports.presenceByCours = (req, res) => {
    Cours.findOne({
        where: {
            id_cours: req.params.id
        }
    })
        .then(cours => {
            // Récupération des données de la table présence pour l'id_cours sélectionné
            Presence.findAll({
                where: {
                    id_cours: cours.id_cours
                },
                include: [{
                    model: Eleve,
                    attributes: ['id_eleve', 'nom_eleve', 'prenom_eleve','eleve_photo']
                }],
                // Tri des données par nom d'élève
                order : [[Eleve, 'nom_eleve', 'ASC']]
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
            id_eleve: req.params.idetudiant
        }
    })

    .then(presence => {
        if (presence.cour.eleve.id_eleve === req.userId) {
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

exports.presenceUpdate = (req, res) => {
    Presence.findOne({
        where: {
            id_presence: req.params.idpresence
        }
    })

    .then(presence => {
        presence.update({
            statut_presence: req.params.statutpresence
        })
            .then(presence => {
                res.status(200).send(presence);
            })
            .catch(err => {
                res.status(500).send({message: err.message});
            });
    })
}

exports.presenceUpdateFace = (req, res) => {
    Presence.findOne({
        where: {
            id_eleve: req.params.ideleve,
            id_cours: req.params.idcours
        }
    })

    .then(presence => {
        presence.update({
            statut_presence: 'Present'
        })
            .then(presence => {
                res.status(200).send(presence);
            })
            .catch(err => {
                res.status(500).send({message: err.message});
            });
    })
}