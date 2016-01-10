/**
 * Created by wenlinli on 2016/1/10.
 */

function saveDoingImgs(imgFiles, imgCount, callback){
    var fileNamePrefix = Date.now();
    if(!fs.existsSync(constants.DOING_IMG_DIR)){
        fileUtil.mkdirsSync(constants.DOING_IMG_DIR, 0777);
    }
    var urlList = [];
    for(var i = 1;i < imgCount; i++){
        var file = imgFiles['img' + i];
        if(!file){
            urlList.push('');
        }else{
            var fileName = fileNamePrefix + '.jpg';
            var fstream = fs.createWriteStream(path.join(constants.DOING_IMG_DIR, fileName));
            file.pipe(fstream);
            fstream.on('close', function(){
                urlList.push(constants.DOING_IMG_URL + '/' + fileName);
                if(urlList.length == imgCount){
                    callback && callback(urlList);
                }
            });
        }
    }
}

var Export = {};
Export.saveDoingImgs = saveDoingImgs;