var Promise = require('bluebird');
var db = require('./server/db/db');
var Item = db.models.item;
var Iteminstance = db.models.iteminstance;
var User = db.models.user;

var data = {
    iteminstances: [
        { price: 0, status: 'inventory', itemId: 3, userId: 1 },
        { price: 0, status: 'inventory', itemId: 13, userId: 1 },
        { price: 0, status: 'inventory', itemId: 5, userId: 2 },
        { price: 0, status: 'inventory', itemId: 13, userId: 2 }
    ]
};

db.sync()
    .then(function () {
        console.log("Seed2: Dropped old data, now inserting data");
        const creatingIteminstances = Promise.map(data.iteminstances, function (iteminstance) {
            return Iteminstance.create(iteminstance);
        });
        return Promise.all([creatingIteminstances])
    })
    .then(function () {
        console.log('Finished inserting data');
    })
    .catch(function (err) {
        console.error('There was totally a problem', err, err.stack);
    })
    .finally(function () {
        db.close(); // creates but does not return a promise
        return null; // stops bluebird from complaining about un-returned promise
    });