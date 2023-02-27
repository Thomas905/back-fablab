const Cours = require('../model/cours');

exports.coursAll= (req, res) => {
    Cours.findAll()
        .then(cours => {
            res.status(200).send(cours);
        });
}