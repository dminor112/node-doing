/**
 * Created by wenlinli on 2015/12/29.
 */
var EventProxy = require('eventproxy');
var proxy = new EventProxy();
var events = ['e1', 'e2', 'e3'];

proxy.assign(events, function(l1, l2, l3){
    console.log('all done, ', l1, l2, l3);
});

setTimeout(function(){
    console.log('done...e1');
    proxy.emit('e1');
}, 1000);

setTimeout(function(){
    console.log('done...e2');
    proxy.emit('e2');
}, 1500);

setTimeout(function(){
    console.log('done...e3');
    proxy.emit('e3');
}, 2000);