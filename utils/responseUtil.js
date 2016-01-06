/**
 * Created by wenlinli on 2016/1/6.
 */

function responseNoCache(response, data, callback){
    response.setHeader("Pragma", "No-cache");
    response.setHeader("Cache-Control", "no-cache");
    response.setHeader("Expires", 0);
    if(callback){
        data = callback + '(' + JSON.stringify(data) + ')';
    }
    response.send(data);
}
function responseOK(response, data, callback){
    responseNoCache(response, {
        status: 200,
        statusText: 'ok',
        'data': data
    }, callback);
}

function responseLackParams(response, callback){
    responseNoCache(response, {
        status: 401,
        statusText: 'param error.',
        'data': ''
    }, callback);
}

function responseSysError(response, callback){
    responseNoCache(response, {
        status: 501,
        statusText: 'server error.',
        'data': ''
    }, callback);
}

function responseOptError(response, callback){
    responseNoCache(response, {
        status: 502,
        statusText: 'operate failed.',
        'data': ''
    }, callback);
}

var Export = {};
Export.responseOK = responseOK;
Export.responseLackParams = responseLackParams;
Export.responseSysError = responseSysError;
Export.responseOptError = responseOptError;

module.exports = Export;