var Promise = require('bluebird');
var db = require('./db/db');
var Item = db.models.item;
var Iteminstance = db.models.iteminstance;
var User = db.models.user;

function interact(gameEvent) {
    //deciding if buying or selling items
    console.log('deciding to buy or sell')
    let decision = Math.floor(Math.random() * 2)
    //how many to buy or sell
    let amount = Math.floor(Math.random() * 20 + 1)
    console.log(decision ? 'selling ' + Math.floor(amount / 2) + ' things' : 'buying ' + amount + ' things')
    //selling
    if (decision === 0) {
        for (i = 0; i < Math.floor(amount / 2); i++) {
            //randomly deciding on item to sell
            let itemId = Math.floor(Math.random() * 14 + 1)
            //checking presence of item on market
            let priceMultiplier = 0
            let lowestMarketPrice
            let exist = false
            function priceSetter() {
                //decide price range
                let range = Math.floor(Math.random() * 10 + 1)
                //decide price within range

                //lowest price range (50%-70% of worth)
                if (range == 1) {
                    priceMultiplier = Math.random() * .2 + 0.5
                } else if (range >= 2 && range <= 4) {
                    //normal price range (70%-130% of worth)
                    priceMultiplier = Math.random() * .6 + 0.7
                } else {
                    //overpriced (130%-300% of worth)
                    priceMultiplier = Math.random() * 1.7 + 1.5
                }
                //overpriced (130%-300% of worth)
            }

            Iteminstance.findAll({
                where: {
                    status: 'market',
                    itemId: itemId
                },
                include: [Item]
            })
                .then(items => {
                    //if instances exist
                    if (items.length > 0) {
                        exist = true
                        //find lowest market price
                        if (items.length === 1) {
                            lowestMarketPrice = items[0].price
                        } else {
                            function sortByPrice(a, b) {
                                return ((a.price > b.price ? 1 : a.price < b.price ? -1 : 0))
                            }
                            let sortedItems = items.sort(sortByPrice)
                            lowestMarketPrice = sortedItems[0].price
                        }
                    } else {
                        //if no instances 
                        //set price using function
                        priceSetter()
                    }
                })
                .then(() => {
                    //getting item information to know it's worth
                    return Item.findOne({
                        where: {
                            id: itemId
                        }
                    })
                })
                .then(item => {
                    //price finalization
                    let competingPrice
                    if (lowestMarketPrice >= item.worth * 0.7 && lowestMarketPrice <= item.worth * 1.3) {
                        competingPrice = lowestMarketPrice - 1
                    } else if (lowestMarketPrice < item.worth * 0.7) {
                        priceSetter()
                        let randomprice = Math.floor(item.worth * priceMultiplier)
                        competingPrice = randomprice
                    } else {
                        competingPrice = Math.floor(lowestMarketPrice * 0.95)
                    }
                    let price = exist ? competingPrice : Math.floor(item.worth * priceMultiplier)
                    //constructing transaction
                    let transactionObj = {
                        price: price,
                        itemId: item.id,
                        status: 'market'
                    }
                    //updating the database
                    return Iteminstance.create(transactionObj)
                })
        }
    } else {
        //buying
        for (j = 0; j < amount.length; j++) {
            //randomly decide on item to buy
            itemId = Math.floor(Math.random() * 14 + 1)
            //checking presence of item on market
            Iteminstance.findAll({
                where: {
                    status: 'market',
                    itemId: itemId
                }
            })
                .then(items => {
                    //if instances exist
                    if (items) {
                        let lowestPricedItem
                        //loop through array of objects for object with lowest price
                        if (items.length === 1) {
                            lowestPricedItem = items[0]
                        } else {
                            function sortByPrice(a, b) {
                                return ((a.price > b.price ? 1 : a.price < b.price ? -1 : 0))
                            }
                            let sortedItems = items.sort(sortByPrice)
                            lowestPricedItem = sortedItems[0]
                        }
                        //find who's selling that item (if it is sold by a player)
                        let sellerId = lowestPricedItem.userId ? lowestPricedItem.userId : 0

                        User.findOne({
                            where: {
                                id: sellerId
                            }
                        })
                            .then(user => {
                                if (user) {
                                    return User.update({ gold: (user.gold + lowestPricedItem.price) }, {
                                        where: {
                                            id: sellerId
                                        }
                                    })
                                }
                            })
                            .then(() => {
                                return Iteminstance.destroy({
                                    where: {
                                        id: lowestPricedItem.id
                                    }
                                })
                            })
                    }
                    //else don't do anything, yet, maybe add demand to item
                })
        }
    }
}

module.exports = interact