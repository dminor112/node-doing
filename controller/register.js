/**
 * Created by wenlinli on 2015/12/7.
 */
var fs = require('fs');
var userInfoService = require('../service/userInfoService');
var commonService = require('../service/commonService');
var fileUtil = require('../utils/fileUtil');
var redis = require('../lib/jredis');
var redisConstants = require('../constants/redisConstants');
var userInfoDao = require('../dao/userInfo');
var responseUtil = require('../utils/responseUtil');
var EventProxy = require('eventproxy');

exports.register = function(req, res, next){
    req.pipe(req.busboy);
    var reqBody = req.busboy;
    var params = {};
    var userInfo = {};
    var proxy = new EventProxy();
    proxy.assign(['imgUpload', 'redis', 'bodyFinish'], function(r1, r2, r3){
        var data = params['data'];
        var userIncr = r2;
        var postJson = data ? JSON.parse(data) : {};
        var deviceCode = postJson['deviceCode'] || '';
        var registerTime = Date.now();
        var md5 = fileUtil.md5(deviceCode + registerTime);
        if(md5 == null){
            return null;
        }
        var userId = md5.substr(0, 7) + userIncr;
        var password = md5.substr(8, 20);
        userInfo.age = postJson.age;
        userInfo.deviceCode = deviceCode;
        userInfo.lastLoginTime = registerTime;
        userInfo.nickName = postJson.nickName;
        userInfo.occupation = postJson.occupation;
        userInfo.password = password;
        userInfo.registerTime = registerTime;
        userInfo.sex = postJson.sex;
        userInfo.userId = userId;
        userInfoDao.addUserInfo(userInfo, function(result){
            console.log('add userInfo ok.');
            commonService.getToken(userId, function(token){
                responseUtil.responseOK(res, {
                    token: token,
                    expire: redisConstants.TOKEN_EXPIRE
                });
            });
        });
    });
    redis.incr(redisConstants.USERID_GEN_INCR, function(data){
        proxy.emit('redis', data);
    });
    reqBody.on('file', function(fieldName, file, fileName){
        if(fieldName == 'imgFile'){
            console.log(99999999);
            userInfoService.saveUserIcon(file, function(url){
                userInfo.iconUrl = url;
                proxy.emit('imgUpload');
            });
        }
    });
    reqBody.on('field', function(key, value){
        params[key] = value;
    });
    reqBody.on('finish', function(){
        proxy.emit('bodyFinish');
    });
}