/**
 * Created by wenlinli on 2015/12/29.
 */
var EventProxy = require('eventproxy');
var redis = require('redis');
var proxy = new EventProxy();
var events = ['e1', 'e2', 'e3'];

var client = redis.createClient(6379, '121.42.33.1', {});
client.on("error", function (err) {
    console.log(11111);
    console.log("Error " + err);
});
client.set('test', '4445566', function(){
    console.log(5555555);
});
console.log(111111, client.get('test', function(err, res){
    console.log(222, err, res);
}));

//proxy.assign(events, function(l1, l2, l3){
//    console.log('all done, ', l1, l2, l3);
//});
//
//setTimeout(function(){
//    console.log('done...e1');
//    proxy.emit('e1');
//}, 1000);
//
//setTimeout(function(){
//    console.log('done...e2');
//    proxy.emit('e2');
//}, 1500);
//
//setTimeout(function(){
//    console.log('done...e3');
//    proxy.emit('e3');
//}, 2000);