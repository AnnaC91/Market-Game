const router = require('express').Router();
const db = require('../db/db');
const Item = db.models.item;
const Iteminstance = db.models.iteminstance;
const User = db.models.user;

router.route('/buy')
    .put(function (req, res, next) {
        console.log(req.body)
        //subtracting gold from buyer
        User.findOne({
            where: {
                id: req.body.buyerId
            }
        })
            .then(user=>{
                let buyerTotalGold = user.gold-parseInt(req.body.itemPrice)
                return User.update({gold: buyerTotalGold}, {
                    where: {
                        id: req.body.buyerId
                    }
                })
            })
            //adding gold to seller
            .then(() => {
                if (req.body.sellerId) {
                    return User.findOne({
                        where: {
                            id: req.body.sellerId
                        }
                    })
                    .then(user => {
                        let sellerTotalGold = user.gold+parseInt(req.body.itemPrice)
                        User.update({gold: sellerTotalGold}, {
                        where: {
                            id: req.body.sellerId
                        }
                    })})
                }
            })
            //exchanging ownership of item and removing from marketboard
            .then(() => {
                return Iteminstance.update(req.body.newInfo, {
                    where: {
                        id: req.body.itemId
                    }
                })
            })
            .then(() => {
                return Iteminstance.findAll({
                    where: {
                        status: 'market',
                    },
                    include: [Item]
                })
            })
            .then(iteminstance => {
                res.json(iteminstance)
            })
    })

router.route('/sell')
    .put(function (req, res, next) {
        //setting instance to market status with price
        Iteminstance.update(req.body.newInfo, {
            where: {
                id: req.body.id
            }
        })
        //getting back inventory
            .then(() => {
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

router.route('/cancel')
    //updating status back to inventory with price to 0
    .put(function (req, res, next) {
        console.log(req.body)
        Iteminstance.update(req.body.newInfo, {
            where: {
                id: req.body.id
            }
        })
        //finding all market instances again
            .then(() => {
                return Iteminstance.findAll({
                    where: {
                        status: 'market',
                    },
                    include: [Item]
                })
            })
            .then(iteminstance => {
                res.json(iteminstance)
            })
    })

module.exports = router;