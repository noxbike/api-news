var express = require('express');
var articleCtrl = require('./controllers/articleCtrl');
var commentCtrl = require('./controllers/commentCtrl');

exports.router =(function(){
    var router = express.Router();

    router.route('/articles').get(articleCtrl.showArticles);
    router.route('/article/:id/').get(articleCtrl.showArticle);
    router.route('/article/create/').post(articleCtrl.create);
    router.route('/article/:id/').put(articleCtrl.update);

    router.route('/article/:id/comment/').get(commentCtrl.show)
    router.route('/article/:id/comment/create/').post(commentCtrl.create);
    
    return router;
}) ();