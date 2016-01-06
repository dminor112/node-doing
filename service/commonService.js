/**
 * Created by wenlinli on 2016/1/6.
 */
var redis = require('../lib/jredis');
var redisConstants = require('../constants/redisConstants');

function getToken(userId, callback){
    var token = new Date(); //TODO
    redis.set(redisConstants.TOKEN_KEY + token, '', redisConstants.TOKEN_EXPIRE + 100, function(){
        callback && callback(token);
    });
}

var Export = {};
Export.getToken = getToken;

module.exports = Export;