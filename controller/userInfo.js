/**
 * Created by wenlinli on 2016/1/7.
 */
var responseUtil = require('../utils/responseUtil');
var transferUtil = require('../utils/transferUtil');
var userInfoDao = require('../dao/userInfo');
var commonService = require('../service/commonService');

exports.getUserInfo = function(request, response, next){
    var userId = request.query['userId'];
    var token = request.query['token'];
    if(!userId || !token){
        responseUtil.responseLackParams(response);
        return;
    }
    commonService.checkToken(userId, function(res){
        if(!res){
            responseUtil.responseLackParams(response);
        }else{
            userInfoDao.findUserInfoByUserId(userId, function(userInfo){
                if(!userInfo){
                    responseUtil.responseLackParams(response);
                    return;
                }
                var resData = {};
                userInfo = userInfo.dataValues;
                resData.nickName = userInfo.nickName || '';
                resData.sex = userInfo.sex || 0;
                resData.age = userInfo.age || 0;
                resData.occupation = userInfo.occupation || '';
                responseUtil.responseOK(response, resData);
            });
        }
    });
}

exports.updateUserInfo = function(request, response, next) {
    request.pipe(request.busboy);
    var reqBody = request.busboy;
    var params = {};
    reqBody.on('field', function(key, value){
        params[key] = value;
    });
    reqBody.on('finish', function(){
        var userJson = transferUtil.parseJson(params['user']);
        var token = params['token'];
        if(!token || !userJson || !userJson.userId){
            responseUtil.responseLackParams(response);
        }
        var userInfo = {};
        userInfo.age = userJson.age;
        userInfo.nickName = userJson.nickName;
        userInfo.sex = userJson.sex;
        userInfo.occupation = userJson.occupation;
        userInfoDao.updateUserInfo(userJson.userId, userInfo, function(res){
            responseUtil.responseOK(response);
        });
    });
}