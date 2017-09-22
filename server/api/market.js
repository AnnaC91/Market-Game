const router = require('express').Router();
const db = require('../db/db');
const Item = db.models.item;
const Marketinstance = db.models.marketinstance;

router.route('/')
    .get(function(req,res,next){
        Marketinstance.findAll({
            include: [Item]
        })
        .then(items => res.json(items))
        .catch(next)
    })


module.exports = router;