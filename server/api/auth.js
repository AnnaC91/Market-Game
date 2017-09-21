const router = require('express').Router();
const db = require('../db/db')
const User = db.models.user;

//login
router.post('/login', (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
})

//logout
router.post('/logout', (req, res, next) => {
    req.logout();
    res.sendStatus(200);
});

module.exports = router;