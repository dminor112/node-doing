/**
 * Created by wenlinli on 2015/12/9.
 */
var constants = require('../constants/constants');
var fs = require('fs');
var path = require('path');
var fileUtil = require('../utils/fileUtil');
var service = {};

service.saveUserIcon = function(file, callback){
    var fileName = Date.now() + '.jpg';
    if(!fs.existsSync(constants.USER_ICON_DIR)){
        fileUtil.mkdirsSync(constants.USER_ICON_DIR, 0777);
    }
    var fstream = fs.createWriteStream(path.join(constants.USER_ICON_DIR, fileName));
    file.pipe(fstream);
    fstream.on('close', function(){
        callback && callback(constants.USER_ICON_URL + '/' + fileName);
    });
}

module.exports = service;