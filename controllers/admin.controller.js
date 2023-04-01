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
        heure_fin: req.body.heurefin
    })
        .then(cours => {
            res.status(200).send(cours);
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
}

exports.classeAll = (req, res) => {
    Classe.findAll({
            where: {
                id_classe: req.params.id
            }
        })
        .then(classe => {
            res.status(200).send(classe);
        });
}

exports.intervenantAll = (req, res) => {
    //select utilisateur with role = 3
    id_user = req.params.id;
    groupe = req.params.groupe;
    if(id_user != 0){
        Utilisateur.findAll({
            where: {
                id_utilisateur: id_user
            }
        })
            .then(intervenant => {
                res.status(200).send(intervenant);
            })
            .catch(err => {
                res.status(500).send({message: err.message});
            })
    }else{
        Utilisateur.findAll({
            where: {
                id_role: 3,
                id_groupe: groupe
            }
        })
            .then(intervenant => {
                res.status(200).send(intervenant);
            })
            .catch(err => {
                res.status(500).send({message: err.message});
            })
    }
}