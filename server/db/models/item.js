const Sequelize = require('sequelize');

const db = require('../base');

const Item = db.define('item', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING
    },
    category: {
        type: Sequelize.STRING
    },
    worth: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    demand: {
        type: Sequelize.STRING,
        defaultValue: 0
    }
});

module.exports = Item;