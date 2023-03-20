const Classe = require('../model/classe');

exports.classeAll = (req, res) => {
    Classe.findAll({
            where: {
                id_ecole: req.params.id
            }
        })
        .then(classe => {
                res.status(200).send(classe);
            }
        )
}