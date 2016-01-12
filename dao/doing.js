/**
 * Created by wenlinli on 2015/12/7.
 */
var Doing = require('../models').Doing;
var sequelize = require('../models').sequelize;

exports.findDoingsByUserId = function(userId, callback){
    sequelize.sync().then(function() {
        return Doing.findAll({
            where: {
                userId: userId
            }
        });
    }).then(function(doing) {
        callback && callback(doing);
    });
}

exports.addDoing = function(doing, callback){
    sequelize.sync().then(function() {
        return Doing.create(doing);
    }).then(function(res) {
        callback && callback(res);
    });
}

exports.pageDoingList = function(page, pageSize, where, callback){
    page = page < 1 ? 1 : page;
    var query = {
        limit: pageSize,
        offset: pageSize * (page - 1)
    };
    if(where){
        query.where = where;
    }
    sequelize.sync().then(function() {
        return Doing.findAll(query);
    }).then(function(res) {
        callback && callback(res);
    });
}