/**
 * Created by wenlinli on 2015/12/7.
 */
var express = require('express');
var doingRouter = require('./router');
var app = express();
var Doing = require('./dao').Doing;

app.use('/', doingRouter);
app.listen(3000)