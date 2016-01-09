/**
 * Created by wenlinli on 2016/1/7.
 */
var responseUtil = require('../utils/responseUtil');
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