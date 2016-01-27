/**
 * Created by wenlinli on 2016/1/27.
 */
var Doing = require('../models').Comment;
var sequelize = require('../models').sequelize;

exports.findCommentById = function(commentId, callback){
    sequelize.sync().then(function() {
        return Comment.find({
            where: {
                id: commentId
            }
        });
    }).then(function(comment) {
        callback && callback(comment);
    });
}

exports.findCommentsByDoingId = function(doingId, callback){
    sequelize.sync().then(function() {
        return Comment.find({
            where: {
                doingId: doingId
            }
        });
    }).then(function(comments) {
        callback && callback(comments);
    });
}

exports.addComment = function(comment, callback){
    sequelize.sync().then(function() {
        return Doing.create(comment);
    }).then(function(res) {
        callback && callback(res);
    });
}

exports.pageCommentList = function(page, pageSize, where, callback){
    page = page < 1 ? 1 : page;
    var query = {
        limit: pageSize,
        offset: pageSize * (page - 1)
    };
    if(where){
        query.where = where;
    }
    sequelize.sync().then(function() {
        return Comment.findAll(query);
    }).then(function(res) {
        callback && callback(res);
    });
}