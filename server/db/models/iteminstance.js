const Sequelize = require('sequelize');

const db = require('../base');

const Iteminstance = db.define('iteminstance', {
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('market','inventory')
    }
});

module.exports = Iteminstance;