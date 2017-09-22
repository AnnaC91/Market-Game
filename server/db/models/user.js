const crypto = require('crypto');
const _ = require('lodash');
const Sequelize = require('sequelize');

const db = require('../base');

const User = db.define('user', {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [8, 50]
        }
    },
    gold: {
        type: Sequelize.INTEGER
    },
    salt: {
        type: Sequelize.STRING
    }
}, {
    hooks: {
        beforeCreate: setSaltAndPassword,
            beforeUpdate: setSaltAndPassword
    }
});

// instance methods
User.prototype.correctPassword = function (candidatePassword) {
    return User.encryptPassword(candidatePassword, this.salt) === this.password;
};

User.prototype.sanitize = function () {
    return _.omit(this.toJSON(), ['password', 'salt']);
};

// class methods
User.generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function (plainText, salt) {
    const hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

function setSaltAndPassword(user) {
    // we need to salt and hash again when the user enters their password for the first time
    // and do it again whenever they change it
    if (user.changed('password')) {
        user.salt = User.generateSalt()
        user.password = User.encryptPassword(user.password, user.salt)
    }

}

module.exports = User;