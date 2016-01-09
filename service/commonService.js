/**
 * Created by wenlinli on 2016/1/6.
 * һЩ�����Ļ�������ӿ�
 */
var redis = require('../lib/jredis');
var AESCoder = require('../lib/AESCoder');
var redisConstants = require('../constants/redisConstants');

//����token
function getToken(userId, callback){
    var token = AESCoder.encrypt(userId + Date.now());
    redis.set(redisConstants.TOKEN_KEY + token, '', redisConstants.TOKEN_EXPIRE + 100, function(){
        callback && callback(token);
    });
}

//���token�Ƿ���Ч
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