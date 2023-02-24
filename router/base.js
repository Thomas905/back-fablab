const router = require('express').Router();
const Utilisateur = require('../model/utilisateurs');
const Role = require('../model/role');
const Groupe = require('../model/groupe');
const Ecole = require('../model/ecole');
const Classe = require('../model/classe');

router.get('/api', (req, res) => {
    res.send("Bienvenue sur l'api FABLAB");
});

router.get('/api/utilisateurs', async (req, res) => {
    const utilisateurs = await Utilisateur.findAll({
        include: [Role, Groupe, Ecole, Classe],
        attributes: { exclude: ['id_role', 'id_groupe', 'id_ecole', 'id_classe'] }

    });
    res.json(utilisateurs);
});

module.exports = router;