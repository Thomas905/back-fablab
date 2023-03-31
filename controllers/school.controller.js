const Ecole = require('../model/ecole');

exports.ecoles = (req, res) => {
    Ecole.findAll({
            where: {
                id_groupe: req.params.group
            }
        })
        .then(ecole => {
            res.status(200).send(ecole);
        });
}