const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const Utilisateur = require("../model/utilisateurs");
const Role = require("../model/role");
const bcrypt = require("bcryptjs");

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    Utilisateur.findOne({
        where: {
            login: req.body.login
        }
    })
        .then(user => {
            const roleData = user.role.dataValues;
            if (roleData.id_role === 1) {
                next();
                return;
            }
            res.status(403).send({
                message: "Require Admin Role !"
            });
        })
};

isTv = (req, res, next) => {
    Utilisateur.findOne({
        where: {
            login: req.body.login
        }
    })
        .then(user => {
            const roleData = user.role.dataValues;
            if (roleData.id_role === 2) {
                next();
                return;
            }
            res.status(403).send({
                message: "Require TV Role !"
            });
        })
};

isInter = (req, res, next) => {
    Utilisateur.findOne({
        where: {
            login: req.body.login
        }
    })
        .then(user => {
            const roleData = user.role.dataValues;
            if (roleData.id_role === 3) {
                next();
                return;
            }
            res.status(403).send({
                message: "Require Inter Role !"
            });
        })
};


isCurrentUser = (req, res, next) => {
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

            if (user.login === req.params.login) {
                next();
                return;
            }
            res.status(403).send({
                message: "Require Current User !"
            });
        })
}

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isTv: isTv,
    isInter: isInter,
    isCurrentUser: isCurrentUser
};

module.exports = authJwt;