/**
 * Created by wenlinli on 2016/1/28.
 */
var Sequelize = require('sequelize');
var friends = {
    id: {type: Sequelize.INTEGER, primaryKey: true},
    userId: Sequelize.STRING,
    friendId: Sequelize.STRING,
    deleted: Sequelize.INTEGER
}

module.exports = friends;