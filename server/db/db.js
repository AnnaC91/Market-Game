const db = require('./base');

const User = require('./models/user');
const Item = require('./models/item');
const Marketinstance = require('./models/marketinstance');

Marketinstance.belongsTo(Item)
Item.hasMany(Marketinstance)

module.exports = db;
