/**
 * Created by wenlinli on 2015/12/31.
 */
var redis = require('redis');
var client = redis.createClient(6379, '121.42.33.1', {});
client.on("error", function (err) {
    console.log("Redis Error " + err);
});
var Export = {};
Export.set = function(key, value, expires, callback){
    if(typeof expires == 'function'){
        callback = expires;
    }
    if(typeof expires != 'number'){
        expires = undefined;
    }
    client.set(key, value, expires, function(err, res){
        if(err){
            console.log('redis set error, ', err);
        }
        callback && callback(res);
    });
}

Export.get = function(key, callback){
    client.get(key, function(err, res){
        if(err){
            console.log('redis get error, ', err);
        }
        callback && callback(res);
    });
}

Export.incr = function(key, callback){
    client.incr(key, function(err, res){
        if(err){
            console.log('redis incr error, ', err);
        }
        callback && callback(res);
    });
}

Export.exists = function(key, callback){
    client.exists(key, function(err, res){
        if(err){
            console.log('redis exists error, ', err);
        }
        callback && callback(res);
    });
}

module.exports = Export;