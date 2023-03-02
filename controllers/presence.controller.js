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