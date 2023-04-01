const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const authJwt = require("../middleware/authJwt");
const testController = require("../controllers/test.controller");
const schoolController = require("../controllers/school.controller");
const coursController = require("../controllers/cours.controller");
const presenceController = require("../controllers/presence.controller");
const adminController = require("../controllers/admin.controller");
const classeController = require("../controllers/classe.controller");

router.get('/api', (req, res) => {
    res.send("Bienvenue sur l'api FABLAB");
});

router.post('/api/register',
    authController.signup
);

router.post('/api/login',
    authController.signin
);

router.get(
"/api/test/user/:login",
    [authJwt.verifyToken],
    testController.test
);

router.get(
"/api/ecoles/:group",
    [authJwt.verifyToken],
    schoolController.ecoles
)

router.get(
"/api/admin/cours",
[authJwt.verifyToken, authJwt.isAdmin],
    adminController.coursAll
)

router.post(
"/api/admin/cours",
    [authJwt.verifyToken, (authJwt.isAdmin || authJwt.isInter)],
    adminController.coursCreate
)

router.get(
"/api/admin/list/classes/:id",
[authJwt.verifyToken, (authJwt.isAdmin || authJwt.isInter)],
    adminController.classeAll
)

router.get(
    "/api/admin/list/intervenants/:id/:groupe",
    [authJwt.verifyToken, ((authJwt.isAdmin) || (authJwt.isInter))],
    adminController.intervenantAll
)

router.get(
    "/api/classe/ecole/:id",
    [authJwt.verifyToken],
    classeController.classeAll
)

router.get(
'/api/classe/:id/cours/:id_user',
[authJwt.verifyToken],
    coursController.coursByClasse
);

router.get(
"/api/cours",
[authJwt.verifyToken, authJwt.isInter],
    coursController.coursByUser
)

router.get(
"/api/presence/cours/:id",
[authJwt.verifyToken],
    presenceController.presenceByCours
)

router.post(
"/api/presence/cours/:idcours/etudiant/:idetudiant/:statutpresence",
[authJwt.verifyToken],
    presenceController.precenceCheck
)

router.post(
"/api/presence/cours/:idpresence/:statutpresence",
[authJwt.verifyToken],
    presenceController.precenceUpdate
)

module.exports = router;