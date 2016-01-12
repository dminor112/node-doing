/**
 * Created by wenlinli on 2015/12/7.
 */
var express = require('express');
var router = express.Router();
var test = require('./controller/test');
var register = require('./controller/register');
var userInfo = require('./controller/userInfo');
var doing = require('./controller/doing');

router.get('/hello', test.hello);
router.post('/do/gi', register.register);
router.get('/do/ke', register.getToken);
router.get('/userinfo/get', userInfo.getUserInfo);
router.post('/userinfo/save', userInfo.updateUserInfo);
router.post('/doing/pub', doing.publishDoing);
router.get('/doing/global/list', doing.globalDoingList);
module.exports = router;