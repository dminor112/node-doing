/**
 * Created by wenlinli on 2016/1/10.
 * 状态发布获取等状态相关的api
 */
var EventProxy = require('eventproxy');
var commonService = require('../service/commonService');
var doingService = require('../service/doingService');
var doingDao = require('../dao/doing');
var responseUtil = require('../utils/responseUtil');

exports.publishDoing = function(request, response, net){
    var params = {};
    request.pipe(request.busboy);
    var reqBody = request.busboy;
    var proxy = new EventProxy();
    var imgFiles = {};
    proxy.assign(['checkToken', 'checkParams', 'saveImgs'], function(r1, r2, r3){
        if(!r1){
            responseUtil.responseLackParams(response);
        }
        var urlList = r3;
        var doing = {};
        doing.message = params.message;
        doing.device = params.device;
        doing.imgList = params.urlList;
        doing.userId = params.userId;
        doing.publishTime = Date.now();
        doing.position = params.position;
        doing.position = params.position;
        doingDao.addDoing(doing, function(res){
            responseUtil.responseOK(response);
        });
    });
    reqBody.on('file', function(fieldName, file, fileName){
        if(fieldName.startsWith('img')){
            imgFiles[fieldName] = file;
        }
    });
    reqBody.on('field', function(key, value){
        params[key] = value;
    });
    reqBody.on('finish', function(){
        var token = params.token;
        if(!token){
            responseUtil.responseLackParams(response);
        }
        commonService.chackTokenProxy(token, proxy);
        doingService.saveDoingImgs(imgFiles, params['imgCount'], function(urlList){
            proxy.emit('saveImgs', urlList);
        });
        proxy.emit('checkParams');
    });
}
