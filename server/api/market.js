const router = require('express').Router();
const db = require('../db/db');
const Item = db.models.item;
const Iteminstance = db.models.iteminstance;

router.route('/')
    .get(function(req,res,next){
        Iteminstance.findAll({
            where: {
                status: 'market'
            },
            include: [Item]
        })
        .then(items => res.json(items))
        .catch(next)
    })


module.exports = router;