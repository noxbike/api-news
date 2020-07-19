var express = require('express');
var articleCtrl = require('./controllers/articleCtrl');
var commentCtrl = require('./controllers/commentCtrl');

exports.router =(function(){
    var router = express.Router();

    router.route('/articles').get(articleCtrl.showArticles);
    //router.route('/article').get(articleCtrl.showOneArticle);
    router.route('/article/create/').post(articleCtrl.create);
    router.route('/article/edit/').put(articleCtrl.update);

    //router.route('/article/comment/').get(commentCtrl.show)
    //router.route('/article/comment/create').post(commentCtrl.create);
    
    return router;
}) ();