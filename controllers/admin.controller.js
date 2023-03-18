const Cours = require("../model/cours");
const Classe = require("../model/classe");
const Utilisateur = require("../model/utilisateurs");

exports.coursAll= (req, res) => {
    Cours.findAll()
        .then(cours => {
            res.status(200).send(cours);
        });
}

exports.coursCreate = (req, res) => {
    Cours.create({
        nom_cours: req.body.nomcours,
        id_classe: req.body.idclasse,
        id_intervenant: req.body.idintervenant,
        date_cours: req.body.datecours,
        heure_debut: req.body.heuredebut,
        heure_fin: req.body.heurefin,
        description: req.body.description
    })
        .then(cours => {
            res.status(200).send(cours);
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
}

exports.classeAll = (req, res) => {
    Classe.findAll()
        .then(classe => {
            res.status(200).send(classe);
        });
}

exports.intervenantAll = (req, res) => {
    //select utilisateur with role = 3
    Utilisateur.findAll({
        where: {
            id_role: 3
        }
    })
        .then(intervenant => {
            res.status(200).send(intervenant);
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        })
}