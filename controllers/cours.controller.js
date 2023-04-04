const Cours = require('../model/cours');
const Classe = require("../model/classe");
const Utilisateur = require("../model/utilisateurs");
const sequelize = require('../database/db');

exports.coursByClasse = (req, res) => {
    // Get the id of the user from the request
    id_user = req.params.id_user;
    Classe.findOne({
        where: {
            id_classe: req.params.id,
        },
    })
    .then(classe => {
        // Get the lessons of the class where the date is today
        // Call to the sequelize function curdate() to compare the date of the lesson with the current date
        if(id_user != 0){
            // If the user is a teacher, we get the lessons where the teacher is the one who is connected and the lesson is today
            Cours.findAll({
                where: {
                    id_classe: classe.id_classe,
                    date_cours: sequelize.fn('curdate'),
                    id_intervenant: id_user
                },
                order: [
                    ['heure_debut', 'ASC']
                ]
            })
                .then(cours => {
                    res.status(200).send(cours);
                })
                .catch(err => {
                    res.status(500).send({message: err.message});
                });
        }else{
            // If the user is an admin, we get the lessons of the class and the lesson is today
            Cours.findAll({
                where: {
                    id_classe: classe.id_classe,
                    date_cours: sequelize.fn('curdate')
                },
                order: [
                    ['heure_debut', 'ASC']
                ]
            })
                .then(cours => {
                    res.status(200).send(cours);
                })
                .catch(err => {
                    res.status(500).send({message: err.message});
                });
        }
    })
    .catch(err => {
        res.status(500).send({message: err.message});
    });
}

exports.coursByUser = (req, res) => {
    Utilisateur.findOne({
        where: {
            id_utilisateur: req.userId
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