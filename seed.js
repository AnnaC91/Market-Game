var Promise = require('bluebird');
var db = require('./server/db/db');
var Item = db.models.item;
var Iteminstance = db.models.iteminstance;
var User = db.models.user;

var data = {
    items: [
        { name: 'HP Potion', description: 'Restores health', category: 'Consumable', worth: 5, demand: 0 },
        { name: 'MP Potion', description: 'Restores mana', category: 'Consumable', worth: 5, demand: 0 },
        { name: 'Sword', description: 'Weapon for Warriors', category: 'Weapon', worth: 75, demand: 10 },
        { name: 'Spear', description: 'Weapon for Lancer', category: 'Weapon', worth: 100, demand: 20 },
        { name: 'Bow', description: 'Weapon for Ranger', category: 'Weapon', worth: 125, demand: 35 },
        { name: 'Axe', description: 'Weapon for Berserker', category: 'Weapon', worth: 90, demand: 15 },
        { name: 'Shield', description: 'Weapon for Warrior', category: 'Weapon', worth: 50, demand: 10 },
        { name: 'Dagger', description: 'Weapon for Assassin', category: 'Weapon', worth: 120, demand: 30 },
        { name: 'Staff', description: 'Weapon for Caster', category: 'Weapon', worth: 150, demand: 25 },
        { name: 'Spellblade', description: 'Weapon for Medic', category: 'Weapon', worth: 120, demand: 30 },
        { name: 'Arrows', description: 'Ammunition for Ranger', category: 'Consumable', worth: 1, demand: 0 },
        { name: 'Plate Armor', description: 'Armor for Warrior, Berserker', category: 'Armor', worth: 150, demand: 25 },
        { name: 'Leather Armor', description: 'Armor for Ranger, Assassin, Lancer', category: 'Armor', worth: 100, demand: 85 },
        { name: 'Cloth Armor', description: 'Armor for Caster, Medic', category: 'Armor', worth: 80, demand: 55 }
    ],
    users: [
        {username: 'test1', email: 'test@one.com', password: 'hauhau1234', gold: 100},
        {username: 'test2', email: 'test@two.com', password: 'hauhau1234', gold: 100}
    ],
    iteminstances: [
        { price: 5, status: 'market', itemId: 1 },
        { price: 5, status: 'market', itemId: 2 },
        { price: 5, status: 'market', itemId: 1 },
        { price: 5, status: 'market', itemId: 2 },
        { price: 5, status: 'market', itemId: 1 },
        { price: 5, status: 'market', itemId: 2 },
        { price: 5, status: 'market', itemId: 1 },
        { price: 5, status: 'market', itemId: 2 }
    ]
};

db.sync({ force: true })
    .then(function () {
        console.log("Seed: Dropped old data, now inserting data");
        const creatingItems = Promise.map(data.items, function (item) {
            return Item.create(item);
        });
        const creatingUsers = Promise.map(data.users, function (user) {
            return User.create(user);
        });
        const creatingIteminstances = Promise.map(data.iteminstances, function (iteminstance) {
            return Iteminstance.create(iteminstance);
        });
        return Promise.all([creatingUsers, creatingItems, creatingIteminstances])
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