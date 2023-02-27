const Cours = require('../model/cours');
const Classe = require("../model/classe");

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