const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const Utilisateur = require("../model/utilisateurs");
const Role = require("../model/role");

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


const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
};

module.exports = authJwt;