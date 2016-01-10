/**
 * Created by wenlinli on 2016/1/6.
 */
var http = require('http');
var path = require('path');
var fs = require('fs');

function postFile(options, fileKeyValue) {

    var req = http.request(options, function(res){
        console.log("RES:" + res);
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        //res.setEncoding("utf8");
        res.on("data", function(chunk){
            console.log("BODY:" + chunk);
        })
    })

    req.on('error', function(e){
        console.log('problem with request:' + e.message);
        console.log(e);
    })

    var boundaryKey = Math.random().toString(16);
    var enddata = '\r\n----' + boundaryKey + '--';

    var files = new Array();
    for (var i = 0; i < fileKeyValue.length; i++) {
        var content = "\r\n----" + boundaryKey + "\r\n" + "Content-Type: application/octet-stream\r\n" + "Content-Disposition: form-data; name=\"" + fileKeyValue[i].urlKey + "\"; filename=\"" + path.basename(fileKeyValue[i].urlValue) + "\"\r\n" + "Content-Transfer-Encoding: binary\r\n\r\n";
        var contentBinary = new Buffer(content, 'utf-8');//当编码为ascii时，中文会乱码。
        files.push({contentBinary: contentBinary, filePath: fileKeyValue[i].urlValue});
    }
    var contentLength = 0;
    for (var i = 0; i < files.length; i++) {
        var stat = fs.statSync(files[i].filePath);
        contentLength += files[i].contentBinary.length;
        contentLength += stat.size;
    }

    req.setHeader('Content-Type', 'multipart/form-data; boundary=--' + boundaryKey);
    req.setHeader('Content-Length', contentLength + Buffer.byteLength(enddata));

    // 将参数发出
    var fileindex = 0;
    var doOneFile = function(){
        req.write(files[fileindex].contentBinary);
        var fileStream = fs.createReadStream(files[fileindex].filePath, {bufferSize : 4 * 1024});
        fileStream.pipe(req, {end: false});
        fileStream.on('end', function() {
            fileindex++;
            if(fileindex == files.length){
                console.log(11111111133);
                req.end(enddata, function(err){
                    console.log(55555, err);
                });
            } else {
                doOneFile();
            }
        });
    };
    console.log(111111111);
    if(fileindex == files.length){
        console.log(11111111122);
        req.end(enddata);
    } else {
        doOneFile();
    }
}


function post(options, params)
{
    console.log(" COME IN");
    var params = JSON.stringify(params);

    options.headers = {
        'Content-Type':'application/x-www-form-urlencoded',
        'Content-Length':params.length
    };
    options.method = 'post';
//使用http 发送
    var req = http.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
//设置字符编码
        res.setEncoding('utf8');
//返回数据流
        var _data="";
//数据
        res.on('data', function (chunk) {
            _data+=chunk;
            console.log('BODY: ' + chunk);
        });
// 结束回调
        res.on('end', function(){
            console.log("REBOAK:",_data)
        });
//错误回调 // 这个必须有。 不然会有不少 麻烦
        req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
        });
    });
    req.write(params + "\n");
    req.end();
}

//postFile({
//    host: "127.0.0.1",
//    port: 3001 ,
//    method: "POST",
//    path: "/do/gi"
//}, [
//    {urlKey: "imgFile", urlValue: "d:\\test.jpg"}
//]);
post({
    host: '127.0.0.1',
    port: 3001,
    path: '/do/ke'
}, {userId: 'test', 'password': 'pp'});