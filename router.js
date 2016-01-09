/**
 * Created by wenlinli on 2015/12/7.
 */
var express = require('express');
var router = express.Router();
var test = require('./controller/test');
var register = require('./controller/register');

router.get('/hello', test.hello);
router.post('/do/gi', register.register);
router.post('/do/ke', register.getToken);
module.exports = router;