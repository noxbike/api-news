var express = require('express');
var articleCtrl = require('./controllers/articleCtrl');
var commentCtrl = require('./controllers/commentCtrl');
var contentCtrl = require('./controllers/contentCtrl');

exports.router =(function(){
    var router = express.Router();

    router.route('/articles/').get(articleCtrl.showArticles);
    router.route('/article/:id/').get(contentCtrl.show);
    router.route('/article/:id/create/').post(contentCtrl.create)
    router.route('/article/create/').post(articleCtrl.create);
    router.route('/article/:id/').put(articleCtrl.update);
    router.route('/article/:id/update').put(contentCtrl.update);
    router.route('/article/:id/').delete(articleCtrl.delete);

    router.route('/article/:id/comment/').get(commentCtrl.show)
    router.route('/article/:id/comment/create/').post(commentCtrl.create);
    router.route('/article/:id/comment/:idComment').delete(commentCtrl.delete);
    
    return router;
}) ();