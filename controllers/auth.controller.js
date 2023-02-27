const config = require("../config/auth.config");
const Utilisateur = require("../model/utilisateurs");
const Role = require("../model/role");
const { Sequelize } = require('sequelize');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
            const roleData = user.role.dataValues;
                authorities.push("ROLE_" + roleData.libelle_role.toUpperCase());
                res.status(200).send({
                    id: user.id,
                    login: user.login,
                    nom: user.nom,
                    prenom: user.prenom,
                    roles: authorities,
                    accessToken: jwt.sign({ id: user.id }, config.secret, {
                        expiresIn: 86400 // 24 hours
                    })
                });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

