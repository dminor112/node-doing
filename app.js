/**
 * Created by wenlinli on 2015/12/7.
 */
var express = require('express');
var doingRouter = require('./router');
var busboy = require('connect-busboy');
var app = express();

app.use(busboy());
app.use('/', doingRouter);
app.listen(3000)