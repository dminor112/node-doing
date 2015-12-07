/**
 * Created by wenlinli on 2015/12/7.
 */
var express = require('express');
var router = express.Router();
var test = require('./controller/test');

router.get('/hello', test.hello);
module.exports = router;