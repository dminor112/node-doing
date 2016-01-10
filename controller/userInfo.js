/**
 * Created by wenlinli on 2016/1/7.
 */
var responseUtil = require('../utils/responseUtil');
var transferUtil = require('../utils/transferUtil');
var userInfoDao = require('../dao/userInfo');
var commonService = require('../service/commonService');

exports.getUserInfo = function(request, response, next){
    var userId = request.params['userId'];
    var token = request.params['token'];
    if(!userId || !token){
        responseUtil.responseLackParams(response);
    }
    commonService.checkToken(userId, function(res){
        if(!res){
            responseUtil.responseLackParams(response);
        }else{
            userInfoDao.findUserInfoByUserId(userId, function(userInfo){
                if(!userInfo){
                    responseUtil.responseLackParams(response);
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
        var userJson = transferUtil.parseJson(param['userJson']);
        var token = param['token'];
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