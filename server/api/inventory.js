const router = require('express').Router();
const db = require('../db/db');
const Item = db.models.item;
const Iteminstance = db.models.iteminstance;

router.route('/:id')
    .get(function(req, res, next){
        Iteminstance.findAll({
            where: {
                status: 'inventory',
                userId: req.params.id
            },
            include: [Item]
        })
        .then(items => res.json(items))
    })

module.exports = router;