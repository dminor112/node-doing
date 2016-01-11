/**
 * Created by wenlinli on 2016/1/9.
 * 网络传输中用到的一些转换之类的操作函数
 */

function parseJson (str){
    var res = null;
    if(str) {
        try {
            res = JSON.parse(str);
        } catch (e) {
            console.log('paeseJson error', e);
        }
    }
    return res;
}

function jsonToStr(json){
    var res = null;
    if(json){
        try{
            res = JSON.stringify(json);
        }catch(e){
            console.log('jsonToStr error', e);
        }
    }
    return res;
}

var Export = {};
Export.parseJson = parseJson;
Export.jsonToStr = jsonToStr;
module.exports = Export;