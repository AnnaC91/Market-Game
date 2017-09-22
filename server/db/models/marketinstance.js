const Sequelize = require('sequelize');

const db = require('../base');

const Marketinstance = db.define('marketinstance', {
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Marketinstance;