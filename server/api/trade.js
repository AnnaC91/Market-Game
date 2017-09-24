const router = require('express').Router();
const db = require('../db/db');
const Item = db.models.item;
const Iteminstance = db.models.iteminstance;
const User = db.models.user;

// router.route('/buy')
//     .put(function(req,res,next){
//         Iteminstance.update(req.body.status,{
//             where: {
//                 id: req.body.id
//             }
//         })
//         .then()
//     })

router.route('/sell')
    .put(function(req,res,next){
        Iteminstance.update(req.body.status,{
            where: {
                id: req.body.id
            }
        })
        .then(()=>{
            return Iteminstance.findAll({
            where: {
                status: 'inventory',
                userId: req.body.userId
            },
            include: [Item]
        })
        })
        .then(iteminstance => {
            res.json(iteminstance)
        })
    })

module.exports = router;