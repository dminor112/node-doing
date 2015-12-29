/**
 * Created by wenlinli on 2015/12/7.
 */
var fs = require('fs');
var userInfoService = require('../service/userInfoService');
var fileUtil = require('../utils/fileUtil');

exports.register = function(req, res, next){
    var fstream;
    req.pipe(req.busboy);
    var reqBody = req.busboy;
    var params = {};
    var userInfo = {};
    reqBody.on('file', function(fieldName, file, fileName){
        if(fieldName == 'imgFile'){
            userInfoService.saveUserIcon(file, function(url){
                userInfo.iconUrl = url;
            });
        }
    });
    reqBody.on('field', function(key, value){
        params[key] = value;
    });
    reqBody.on('finish', function(){
        var deviceCode = params['deviceCode'] || '';
        var registerTime = Date.now();
        var md5 = fileUtil.md5(deviceCode + registerTime);
        if(md5 == null){
            return null;
        }
       /* String userId = md5.substring(0, 7) + redis.incr(RedisConstants.USERID_GEN_INCR);
        String password = md5.substring(8, 20);

        userInfo.setAge(postJson.getIntValue("age"));
        userInfo.setDeviceCode(deviceCode);
        userInfo.setIconUrl("http://p1.gexing.com/G1/M00/AC/85/rBACFFPzVnXhKBDLAACQ503PAK8037.jpg");
        userInfo.setLastLoginTime(registerTime);
        userInfo.setNickName(postJson.getString("nickName"));
        userInfo.setOccupation(postJson.getString("occupation"));
        userInfo.setPassword(password);
        userInfo.setRegisterTime(registerTime);
        userInfo.setSex(postJson.getIntValue("sex"));
        userInfo.setUserId(userId);
        return userInfo;*/
    });
    /*console.log(req.files);
    if(req.files && req.files.imgFile){
        var tempPath = req.files.imgFile.path;
        if(tempPath){
            console.log('------', tempPath);
            fs.readFile(tempPath, 'utf-8', function(err, content){
                fs.writeFile('/data/aaa.jpg', content, function(){
                    console.log("write file success!");
                    fs.unlink(tempPath);
                });
            });
        }
    }else{
        console.log('++++++++', 'no files');
        res.send('no files..');
    }*/
}