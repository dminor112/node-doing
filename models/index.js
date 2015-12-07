/**
 * Created by wenlinli on 2015/12/7.
 */
/*
var orm = require("orm")
var doing = require("./doing")
var opts = {
    database: "doing",
    protocol: "mysql",
    hostname: "121.42.33.1",
    user: "doing",
    password: "zx415@#12",
    query: {
        pool: true
    }
}
orm.connect(opts, function(err, db){
    if(err) throw err;
    var Doing = db.define('doing', doing);
    Doing.find({userId: "123"}, function(err, Doing){
        console.log("Doing found err: ", err);
        console.log("Doing found: ", Doing);
    });
})
*/

var Sequelize = require('sequelize');
var sequelize = new Sequelize('doing', 'doing', 'zx415@#12', {
    host: '121.42.33.1',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

var doing = require("./doing");
var userInfo = require("./userInfo");

var Doing = sequelize.define('doing', doing, { freezeTableName: true,
    timestamps: false});
var UserInfo = sequelize.define('userInfo', userInfo, { freezeTableName: true,
    timestamps: false});

exports.sequelize = sequelize;
exports.Doing = Doing;
exports.UserInfo = UserInfo;
/*sequelize.sync().then(function() {
    return Doing.findAll({
        where: {
            userId: '123'
        }
    });
}).then(function(doing) {
    console.log(doing);
});*/
