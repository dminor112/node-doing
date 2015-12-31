/**
 * Created by wenlinli on 2015/12/31.
 */
var redis = require('redis');
var client = redis.createClient(6379, '121.42.33.1', {});
client.on("error", function (err) {
    console.log("Redis Error " + err);
});
var Export = {};
Export.set = function(key, value, expires){
    if(typeof expires != 'number'){
        expires = undefined;
    }
    client.set(key, value, expires, function(){

    });
}
client.set('test', '1233');
console.log(111111, client.get('test', function(err, res){
    console.log(222, err, res);
}));