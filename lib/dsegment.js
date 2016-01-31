/**
 * Created by wenlinli on 2016/1/31.
 */
// 载入模块
var Segment = require('segment');
// 创建实例
var segment = new Segment();
// 使用默认的识别模块及字典，载入字典文件需要1秒，仅初始化时执行一次即可
segment.useDefault();
//segment.loadSynonymDict('./synonym.txt');
var doingTips = {
    '在' : true,
    '正在' : true
}

var dsegment = {};
dsegment.doSegment = function(text){
    // 开始分词
    var wordList = segment.doSegment(text, {convertSynonym: true});
    console.log(wordList);
    var isFirst = true,
        isDoing = false,
        fitWord = '';
    for(var i = 0; i < wordList.length; i++){
        var word = wordList[i];
        if(word.p == 4096){ //如果是动词，且是第一次出现或者是前一个词是表示正在进行时的话。
            if(isDoing){
                fitWord = word.w;
                break;
            }else if(isFirst){
                fitWord = word.w;
                isFirst = false;
            }
        }else if(doingTips[word.w]){
            isDoing = true;
        }
    }
    return fitWord;
}
console.log(dsegment.doSegment('我正在端详你和上网'));
module.exports = dsegment;