/**
 * Created by wenlinli on 2016/1/31.
 */
// 载入模块
//var Segment = require('segment');
/*var path = require('path');
// 创建实例
var segment = new Segment();
// 使用默认的识别模块及字典，载入字典文件需要1秒，仅初始化时执行一次即可
segment.useDefault();
segment.loadSynonymDict(path.resolve('synonym.txt'));

// 开始分词
console.log(segment.doSegment('我正在上网和哈哈',{
    convertSynonym: true
}));*/
/*var text = '什么时候我也开始夜夜无法入睡';
var result = segment.doSegment(text, {
    convertSynonym: true
});
console.log(result);*/
var dsegment = require('../lib/dsegment');
console.log(dsegment.doSegment('我正在上网和哈哈'));
