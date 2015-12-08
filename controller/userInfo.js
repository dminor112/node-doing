/**
 * Created by wenlinli on 2015/12/8.
 */
var commonService = require('../service/common');

exports.getUserInfo = function(req, res, next){
    var token = req.params.token;
    if(commonService.checkToken(token)){

    }
}