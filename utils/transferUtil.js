/**
 * Created by wenlinli on 2016/1/9.
 * ���紫�����õ���һЩת��֮��Ĳ�������
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