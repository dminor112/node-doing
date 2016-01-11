/**
 * Created by wenlinli on 2015/12/29.
 */
var fs = require('fs');
var crypto = require('crypto');
var path = require('path');
var util = {};
//创建多层文件夹 同步
util.mkdirsSync = function(dirpath, mode) {
    if (!fs.existsSync(dirpath)) {
        var pathtmp;
        dirpath.split('/').forEach(function(dirname) {
            if (pathtmp) {
                pathtmp = path.join(pathtmp, dirname);
            }
            else {
                pathtmp = '/' + dirname;
            }
            if (!fs.existsSync(pathtmp)) {
                if (!fs.mkdirSync(pathtmp, mode)) {
                    return false;
                }
            }
        });
    }
    return true;
}

util.md5 = function (str) {
    var md5sum = crypto.createHash('md5');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
};

module.exports = util;