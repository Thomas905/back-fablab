const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const authJwt = require("../middleware/authJwt");
const testController = require("../controllers/test.controller");
const schoolController = require("../controllers/school.controller");
const coursController = require("../controllers/cours.controller");
const presenceController = require("../controllers/presence.controller");
const adminController = require("../controllers/admin.controller");
const classeController = require("../controllers/classe.controller");
const multer = require('multer');
const path = require('path');

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
"/api/ecoles",
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
    [authJwt.verifyToken, authJwt.isAdmin],
    adminController.coursCreate
)

router.get(
"/api/admin/list/classes",
[authJwt.verifyToken, authJwt.isAdmin],
    adminController.classeAll
)

router.get(
    "/api/admin/list/intervenants",
    [authJwt.verifyToken, authJwt.isAdmin],
    adminController.intervenantAll
)

router.get(
    "/api/classe/ecole/:id",
    [authJwt.verifyToken],
    classeController.classeAll
)

router.get(
'/api/classe/:id/cours',
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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/face-image')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({ storage: storage });
console.log(upload)

router.post('/api/upload-image', upload.single('image'), (req, res) => {
    res.json({ message: 'Image téléchargée avec succès' });
});

module.exports = router;