/**
 * Created by wenlinli on 2016/1/28.
 */
var Friends = require('../models').Friends;
var sequelize = require('../models').sequelize;

exports.getUserFriends = function(userId, callback){
    sequelize.sync().then(function() {
        return Friends.findAll({
            where: {
                userId: userId,
                deleted: 0
            }
        });
    }).then(function(friends) {
        callback && callback(friends);
    });
}

exports.addFriend = function(friend, callback){
    sequelize.sync().then(function() {
        return Friends.create(friend);
    }).then(function(res) {
        callback && callback(res);
    });
}

exports.updateFriend = function(friend, callback){
    sequelize.sync().then(function() {
        return Friends.update(friend, {
            where: {
                'userId': friend.userId,
                'friendId': friend.friendId
            }});
    }).then(function(res) {
        callback && callback(res);
    });
}