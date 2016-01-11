/**
 * Created by wenlinli on 2016/1/10.
 * 状态发布获取等状态相关的api
 */
var EventProxy = require('eventproxy');
var commonService = require('../service/commonService');
var doingService = require('../service/doingService');
var doingDao = require('../dao/doing');
var responseUtil = require('../utils/responseUtil');
var transferUtil = require('../utils/transferUtil');

exports.publishDoing = function(request, response, net){
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
