const Ecole = require('../model/ecole');

exports.ecoles = (req, res) => {
    Ecole.findAll()
        .then(ecole => {
            res.status(200).send(ecole);
        });
}