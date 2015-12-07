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