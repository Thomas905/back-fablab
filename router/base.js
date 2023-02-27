const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const authJwt = require("../middleware/authJwt");
const testController = require("../controllers/test.controller");
const schoolController = require("../controllers/school.controller");
const coursController = require("../controllers/cours.controller");

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

router.get(
'/api/classe/:id/cours',
[authJwt.verifyToken],
    coursController.coursByClasse
);

module.exports = router;