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
var transferUtil = require('../utils/transferUtil');
var EventProxy = require('eventproxy');

//用户注册接口
exports.register = function(request, response, next){
    console.log(2222222222);
    request.pipe(request.busboy);
    var reqBody = request.busboy;
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
        console.log(333, userInfo)
        userInfoDao.addUserInfo(userInfo, function(result){
            commonService.getToken(userId, function(token){
                responseUtil.responseOK(response, {
                    userId: userId,
                    password: password,
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
            userInfoService.saveUserIcon(file, function(url){
                userInfo.iconUrl = url;
                proxy.emit('imgUpload');
            });
        }
    });
    reqBody.on('field', function(key, value){
        console.log(555, key, value);
        params[key] = value;
    });
    reqBody.on('finish', function(){
        proxy.emit('bodyFinish');
    });
}

//客户端重新获取token接口
exports.getToken = function(request, response, next){
    var data = transferUtil.parseJson(request.query['data']);
    if(!data || data.userId || data.password){
        responseUtil.responseLackParams(response)
    }else {
        var userId = data.userId;
        var password = data.password;
        userInfoService.checkUserPassword(userId, password, function (res) {
            commonService.getToken(userId, function (token) {
                responseUtil.responseOK(response, {
                    token: token,
                    expire: redisConstants.TOKEN_EXPIRE
                });
            });
        });
    }
    /*request.pipe(request.busboy);
    var reqBody = request.busboy;
    var params = {};
    reqBody.on('field', function(key, value){
        params[key] = value;
    });
    reqBody.on('finish', function(){
        var data = transferUtil.parseJson(params['data']) || {};

    });*/
}