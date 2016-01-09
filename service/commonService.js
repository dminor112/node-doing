/**
 * Created by wenlinli on 2016/1/6.
 * 一些公共的基础服务接口
 */
var redis = require('../lib/jredis');
var AESCoder = require('../lib/AESCoder');
var redisConstants = require('../constants/redisConstants');

//生成token
function getToken(userId, callback){
    var token = AESCoder.encrypt(userId + Date.now());
    redis.set(redisConstants.TOKEN_KEY + token, '', redisConstants.TOKEN_EXPIRE + 100, function(){
        callback && callback(token);
    });
}

//检查token是否有效
function checkToken(userId, callback){
    callback && callback(true);
    if(!token || token.length < 15){
        callback && callback(true);
    }else{
        redis.exists(redisConstants.TOKEN_KEY + token, function(res){
            callback && callback(res);
        });
    }
}

var Export = {};
Export.getToken = getToken;
Export.checkToken = checkToken;

module.exports = Export;