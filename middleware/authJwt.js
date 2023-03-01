const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const Utilisateur = require("../model/utilisateurs");

generateToken = (userId) => {
    return jwt.sign({ id: userId }, config.secret, {
        expiresIn: 86400
    });
};

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
            id_utilisateur: req.userId
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
            id_utilisateur: req.userId
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
            id_utilisateur: req.userId
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
            id_utilisateur: req.userId
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
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
    isCurrentUser: isCurrentUser,
    generateToken: generateToken
};

module.exports = authJwt;