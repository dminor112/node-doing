/**
 * Created by wenlinli on 2015/12/7.
 */
var fs = require('fs');

exports.register = function(req, res, next){
    var fstream;
    req.pipe(req.busboy);
    var reqBody = req.busboy;
    var params = {};
    reqBody.on('file', function(fieldName, file, fileName){
        console.log('uploading: ', fileName);
        fstream = fs.createWriteStream('/data/aa.jpg');
        file.pipe(fstream);
    });
    reqBody.on('field', function(key, value){
        params[key] = value;
    });
    reqBody.on('finish', function(){
        fstream.on('close', function(){
            res.send('upload ok...');
        });
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