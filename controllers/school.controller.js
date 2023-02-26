const Ecole = require('../model/ecole');
const Groupe = require("../model/groupe");

exports.ecole = (req, res) => {
    Ecole.findAll(
        {
            include: [Groupe],
            attributes: { exclude: ['id_groupe'] }
        }
    ).then(ecole => {

        res.status(200).send(ecole);
    });
}