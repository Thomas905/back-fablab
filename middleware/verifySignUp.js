const Utilisateur = require('../model/utilisateurs');
const Role = require('../model/role');

checkDuplicateUsernameOrEmail = (req, res, next) => {
    Utilisateur.findOne({
        where: {
            login: req.body.login
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Login is already in use!"
            });
            return;
        }

        next();
    });
};

checkRolesExisted = (req, res, next) => {
    Role.findOne({
        where: {
            libelle_role: req.body.libelle_role
        }
    }).then(role => {
        if (role == null && role === undefined) {
            res.status(400).send({
                message: "Role not found !"
            });
            return;
        }

        next();
    });

    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;