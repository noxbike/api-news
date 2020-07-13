var express = require('express');

exports.router =(function(){
    var router = express.Router();

    router.route('/articles').get(articlesCtrl.show);

    router.route('/article').get(articleCtrl.show);
    router.route('/article/create/').post(articleCtrl.create);
    router.route('/article/edit/').put(articleCtrl.edit);

    route.route('/article/comment/').get(commentCtrl.show)
    router.route('/article/comment/create').post(commentCtrl.create);
    

})