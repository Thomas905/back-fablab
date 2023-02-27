const router = require('express').Router();
const Utilisateur = require('../model/utilisateurs');
const Role = require('../model/role');
const Groupe = require('../model/groupe');
const Ecole = require('../model/ecole');
const Classe = require('../model/classe');
const authController = require('../controllers/auth.controller');
const authJwt = require("../middleware/authJwt");
const testController = require("../controllers/test.controller");
const schoolController = require("../controllers/school.controller");
const coursController = require("../controllers/cours.controller");

router.get('/api', (req, res) => {
    res.send("Bienvenue sur l'api FABLAB");
});

router.get('/api/utilisateurs', async (req, res) => {
    const utilisateurs = await Utilisateur.findAll({
    });
    res.json(utilisateurs);
});

router.post('/api/register',
    authController.signup
);

router.post('/api/login',
    authController.signin
);

router.get(
    "/api/test/user",
    [authJwt.verifyToken, authJwt.isAdmin],
    testController.test
);

router.get(
    "/api/ecoles",
    [authJwt.verifyToken],
    schoolController.ecoles
)

router.get(
    "/api/cours",
    [authJwt.verifyToken],
    coursController.coursAll
)


module.exports = router;