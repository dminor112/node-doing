/**
 * Created by wenlinli on 2015/12/7.
 */

exports.hello = function(req, res, next){
    res.setHeader("Pragma", "No-cache");
    res.send('hello...')
}