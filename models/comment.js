/**
 * Created by wenlinli on 2016/1/27.
 */
var Sequelize = require('sequelize');
var comment = {
    id: {type: Sequelize.INTEGER, primaryKey: true},
    userId: Sequelize.STRING,
    doingId: Sequelize.INTEGER,
    isRead: Sequelize.INTEGER,
    isReply: Sequelize.INTEGER,
    publishTime: Sequelize.INTEGER,
    content: Sequelize.STRING
}

module.exports = comment;