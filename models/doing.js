/**
 * Created by wenlinli on 2015/12/7.
 */
var Sequelize = require('sequelize');
var doing = {
    id: {type: Sequelize.INTEGER, primaryKey: true},
    userId: Sequelize.STRING,
    content: Sequelize.STRING,
    imgList: Sequelize.STRING,
    publishTime: Sequelize.INTEGER,
    deviceCode: Sequelize.STRING,
    position: Sequelize.STRING
}

module.exports = doing;