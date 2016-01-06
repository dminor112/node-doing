/**
 * Created by wenlinli on 2015/12/7.
 */
var UserInfo = require('../models').UserInfo;
var sequelize = require('../models').sequelize;

exports.findUserInfoByUserId = function(userId, callback){
    sequelize.sync().then(function() {
        return UserInfo.find({
            where: {
                userId: userId
            }
        });
    }).then(function(userIndo) {
        callback && callback(userIndo);
    });
}

exports.addUserInfo = function(userInfo, callback){
    sequelize.sync().then(function() {
        return UserInfo.create(userInfo);
    }).then(function(res) {
        callback && callback(res);
    });
}