/**
 * Created by wenlinli on 2016/1/10.
 * 状�?�发布获取等状�?�相关的api
 */
var EventProxy = require('eventproxy');
var commonService = require('../service/commonService');
var doingService = require('../service/doingService');
var doingDao = require('../dao/doing');
var userInfoDao = require('../dao/userInfo');
var responseUtil = require('../utils/responseUtil');
var transferUtil = require('../utils/transferUtil');

exports.publishDoing = function(request, response, next){
    var params = {};
    request.pipe(request.busboy);
    var reqBody = request.busboy;
    var proxy = new EventProxy();
    var imgFiles = {};
    var imgCount = 100;
    var urlList = [];
    proxy.assign(['checkToken', 'checkParams', 'saveImgs'], function(r1, r2, r3){
        console.log(444, r1)
        if(!r1){
            responseUtil.responseLackParams(response);
            return;
        }
        var urlList = r3;
        var doing = {};
        doing.content = params.message;
        doing.device = params.device;
        doing.imgList = transferUtil.jsonToStr(urlList);
        doing.userId = params.userId;
        doing.publishTime = Date.now();
        doing.position = params.position;
        doingDao.addDoing(doing, function(res){
            responseUtil.responseOK(response);
        });
    });
    reqBody.on('file', function(fieldName, file, fileName){
        console.log(11144, fieldName);
        if(fieldName.startsWith('img')){
            doingService.saveDoingImg(file, function(url){
                urlList.push(url);
                if(urlList.length == imgCount){
                    proxy.emit('saveImgs', urlList);
                }
            });
        }
    });
    reqBody.on('field', function(key, value){
        console.log(11133, key);
        if(key == 'imgCount'){
            imgCount = value;
        }
        params[key] = value;
    });
    reqBody.on('finish', function(){
        var token = params.token;
        if(!token){
            responseUtil.responseLackParams(response);
            return;
        }
        console.log(11111);
        commonService.chackTokenProxy(token, proxy);
        console.log(22222);
        //doingService.saveDoingImgs(imgFiles, params['imgCount'], function(urlList){
        //    proxy.emit('saveImgs', urlList);
        //});
        proxy.emit('checkParams');
    });
}

exports.globalDoingList = function(request, response, next){
    var userId = request.query['userId'];
    var token = request.query['token'];
    var page = request.query['page'];
    var pageSize = request.query['pageSize'];
    try{
        page = parseInt(page), pageSize = parseInt(pageSize);
    }catch(e){
        page = 1, pageSize = 10;
    }
    var doingList = [];
    doingDao.pageDoingList(page, pageSize, null, function(doingList){
        //console.log(444444, res);
        doingList = doingList || [];
        var userIds = [];
        for(var i = 0; i < doingList.length; i++){
            userIds.push(doingList[i].userId);
        }
        userInfoDao.findUserInfosByUserIds(userIds, function(userInfoList){
            userInfoList = userInfoList || [];
            userListObj = {};
            for(var i = 0; i < userInfoList.length; i++){
                userListObj[userInfoList[i].userId] = userInfoList[i];
            }
            var resDoingList = [];
            for(var i = 0; i < doingList.length; i++){
                var doing = doingList[i];
                var user = userListObj[doing.userId] || {};
                var obj = {};
                var imgList = transferUtil.parseJson(doing.imgList) || [];
                obj.message = doing.content || '';
                obj.device = doing.device || '';
                obj.position = doing.position || '';
                obj.publishTime = doing.publishTime || '';
                obj.imgCount = imgList.length;
                obj.imgList = imgList;

                var userObj = {};
                userObj.userId = user.userId;
                userObj.nickName = user.nickName || '';
                userObj.sex = user.sex;
                userObj.age = user.age;
                userObj.occupation = user.occupation || '';
                obj.user = user;
                resDoingList.push(obj);
            }
            var resData = {};
            resData.allCount = 5;
            resData.list = resDoingList;
            responseUtil.responseOK(response, resData);
        });
    });
}

exports.fitDoingList = function(request, response, next){
    var userId = request.query['userId'];
    var token = request.query['token'];
    var page = request.query['page'] || 1;
    var pageSize = request.query['pageSize'] || 10;
    var doingList = [];
    doingDao.pageDoingList(page, pageSize, null, function(doingList){
        //console.log(444444, res);
        doingList = doingList || [];
        var userIds = [];
        for(var i = 0; i < doingList.length; i++){
            userIds.push(doingList[i].userId);
        }
        userInfoDao.findUserInfosByUserIds(userIds, function(userInfoList){
            userInfoList = userInfoList || [];
            userListObj = {};
            for(var i = 0; i < userInfoList.length; i++){
                userListObj[userInfoList[i].userId] = userInfoList[i];
            }
            var resDoingList = [];
            for(var i = 0; i < doingList.length; i++){
                var doing = doingList[i];
                var user = userListObj[doing.userId] || {};
                var obj = {};
                var imgList = transferUtil.parseJson(doing.imgList) || [];
                obj.message = doing.content || '';
                obj.device = doing.device || '';
                obj.position = doing.position || '';
                obj.imgCount = imgList.length;
                obj.imgList = imgList;

                var userObj = {};
                userObj.userId = user.userId;
                userObj.nickName = user.nickName || '';
                userObj.sex = user.sex;
                userObj.age = user.age;
                userObj.occupation = user.occupation || '';
                obj.user = user;
                resDoingList.push(obj);
            }
            var resData = {};
            resData.allCount = 5;
            resData.list = resDoingList;
            responseUtil.responseOK(response, resData);
        });
    });
}
