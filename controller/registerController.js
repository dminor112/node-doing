/**
 * Created by wenlinli on 2015/12/7.
 */
var fs = require('fs');

exports.register = function(req, res, next){
    if(req.files && req.files.imgFile){
        var tempPath = req.files.imgFile.path;
        if(tempPath){
            fs.readFile(tempPath, 'utf-8', function(err, content){
                fs.writ
                fs.unlink(tempPath);
            });
        }
    }

}