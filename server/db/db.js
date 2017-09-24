const db = require('./base');

const User = require('./models/user');
const Item = require('./models/item');
const Iteminstance = require('./models/iteminstance');

Iteminstance.belongsTo(Item)
Iteminstance.belongsTo(User)
Item.hasMany(Iteminstance)
User.hasMany(Iteminstance)

module.exports = db;
