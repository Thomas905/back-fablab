const router = require('express').Router();

router.get('/api', (req, res) => {
    res.send("Bienvenue sur l'api FABLAB");
});

module.exports = router;