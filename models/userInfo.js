/**
 * Created by wenlinli on 2015/12/7.
 */
var Sequelize = require('sequelize');
var userInfo = {
    id: {type: Sequelize.INTEGER, primaryKey: true},
    nickName: Sequelize.STRING,
    deviceCode: Sequelize.STRING,
    userId: Sequelize.STRING,
    password: Sequelize.INTEGER,
    sex: Sequelize.INTEGER,
    age: Sequelize.INTEGER,
    occupation: Sequelize.STRING,
    identificationMobile: Sequelize.STRING,
    registerTime: Sequelize.INTEGER,
    lastLoginTime: Sequelize.INTEGER,
    iconUrl: Sequelize.STRING,
}

module.exports = userInfo;