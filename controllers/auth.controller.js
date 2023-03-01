const Utilisateur = require("../model/utilisateurs");
const bcrypt = require("bcryptjs");
const authJwt = require("../middleware/authJwt");

exports.signup = (req, res) => {
    Utilisateur.create({
        login: req.body.login,
        nom: req.body.nom,
        prenom: req.body.prenom,
        id_role: 1,
        id_groupe: 1,
        id_ecole: 1,
        id_classe: 1,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then(user => {
            res.send({ message: "User was registered successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.signin = (req, res) => {
    Utilisateur.findOne({
        where: {
            login: req.body.login
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            let passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }
            let authorities = [];
            let school = [];
            const roleData = user.role.dataValues;
            authorities.push("ROLE_" + roleData.libelle_role.toUpperCase());
            const schoolData = user.ecole.dataValues;
            school.push(schoolData.nom_ecole);
            res.status(200).send({
                id: user.id_utilisateur,
                login: user.login,
                nom: user.nom,
                prenom: user.prenom,
                roles: authorities,
                ecole: school,
                accessToken: authJwt.generateToken(user.id_utilisateur)
            });
        })

        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

