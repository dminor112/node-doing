/**
 * Created by wenlinli on 2016/1/26.
 */
var EventProxy = require('eventproxy');
var commonService = require('../service/commonService');
//var doingService = require('../service/commentService');
var commentDao = require('../dao/comment');
var userInfoDao = require('../dao/userInfo');
var responseUtil = require('../utils/responseUtil');
var transferUtil = require('../utils/transferUtil');

exports.publishComment = function(request, response, next){
    console.log(111111);
    var params = {};
    request.pipe(request.busboy);
    var reqBody = request.busboy;
    var proxy = new EventProxy();
    proxy.assign(['checkToken'], function(r1){
        var userId = params.userId,
            doingId = params.doingId;
        if(!userId || !doingId || !r1){
            responseUtil.responseLackParams(response);
            return;
        }
        var comment = {};
        comment.userId = userId;
        comment.doingId = doingId;
        comment.isRead = 0;
        comment.isReply = 0;
        comment.publishTime = Date.now();
        comment.content = params.message;
        commentDao.addComment(comment, function(){
            responseUtil.responseOK(response);
        });
    });
    reqBody.on('field', function(key, value){
        params[key] = value;
    });
    reqBody.on('finish', function(){
        commonService.chackTokenProxy(params.token, proxy);
    });
}

exports.getCommentList = function(request, response, next){
    var doingId = request.query['doingId'];
    var token = request.query['token'];
    var page = request.query['page'] || 1;
    var pageSize = request.query['pageSize'] || 10;

    var commentList = [];
    commentDao.pageCommentList(page, pageSize, {doingId: doingId}, function(commentList){
        //console.log(444444, res);
        commentList = commentList || [];
        var userIds = [];
        for(var i = 0; i < commentList.length; i++){
            userIds.push(commentList[i].userId);
        }
        userInfoDao.findUserInfosByUserIds(userIds, function(userInfoList){
            userInfoList = userInfoList || [];
            userListObj = {};
            for(var i = 0; i < userInfoList.length; i++){
                userListObj[userInfoList[i].userId] = userInfoList[i];
            }
            var resCommentList = [];
            for(var i = 0; i < commentList.length; i++){
                var comment = commentList[i];
                var user = userListObj[doing.userId] || {};
                var obj = {};
                obj.message = comment.content || '';
                obj.publishTime = comment.publishTime || 0;

                var userObj = {};
                userObj.userId = user.userId;
                userObj.nickName = user.nickName || '';
                userObj.sex = user.sex;
                userObj.age = user.age;
                userObj.occupation = user.occupation || '';
                obj.user = user;
                resCommentList.push(obj);
            }
            var resData = {};
            resData.allCount = 5;
            resData.list = resCommentList;
            responseUtil.responseOK(response, resData);
        });
    });
}