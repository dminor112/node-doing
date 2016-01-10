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
        }
    }
    return res;
}

var Export = {};
Export.parseJson = parseJson;