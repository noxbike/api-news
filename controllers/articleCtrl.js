var models = require('../models');

module.exports = {
    create: function(req, res){
        var piture   = req.body.piture;
        var title    = req.body.title;
        var body     = req.body.body;
        var category = req.body.category;

        if(title == null || piture == null || body == null || category == null) {
            return res.status(400).json({ 'error': `missing ${piture}` });
        }

        var newArticle = models.Article.create({
            title:    title,
            piture:   piture,
            body:     body,
            category: category
        })
        .then(function(newArticle) {
            return res.status(201).json({
                'articleId': newArticle.id
            })
        })
        .catch(function(err){
            return res.status(500).json({ 'error': 'cannot post this article'});
        })
    },

    showArticles: function(req, res) {
        var fields = req.query.fields;
        var limit  = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var order  = req.query.order;

        models.Article.findAll({
            order:      [(order != null) ? order.split(':') : ['id', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit:      (!isNaN(limit)) ? limit : null,
            offset:     (!isNaN(offset)) ? offset : null,
        }).then(function(article){
            if(article){
                res.status(200).json({ article });
            }
            else {
                res.status(404).json({ 'error': 'no article found' });
            }
        })
        .catch(function(err){
            res.status(500).json({ 'error': 'invalid fields' });
        })
    },

    showArticle: function(req,res){
        var idArticle = req.params.id;

        models.Article.findOne({
            attributes: ['piture', 'title', 'body', 'createdAt'],
            where:      { id: idArticle }
        })
        .then(function(articleFound){
            if(articleFound){
                res.status(200).json({ articleFound });
            }

            else {
                res.status(404).json({ 'error': 'article not found' });
            }
        })
        .catch(function(err){
            res.status(500).json({ 'error': 'intern error' });
        })
    },
    
    update: function(req, res) {
        var idArticle = req.params.id;
        var title     = req.body.title;

        models.Article.findOne({
            attributes: ['id', 'title'],
            where:      { id: idArticle }
        })
        .then(function(articleFound){
            if(articleFound){
                articleFound.update({
                    'title': title
                })
                .then(function(success){
                    res.status(200).json({ 'message': 'updated with success' });
                })
                .catch(function(err){
                    res.status(400).json({ 'error': 'cannot update' });
                })
            }
            else{
                res.status(404).json({ 'error': 'article not found' });
            }
        })
        .catch(function(err){
            res.status(500).json({ 'error': 'invalid params' });
        })
    },

    deleted: function(req, res) {
        var idArticle =  req.body.idArticle;

        models.Article.destroy({
            where: { id: idArticle }
        })
        .then(function(articleFound){
            res.status(200).json({'deleted': articleFound });
        })
        .catch(function(err){
            return res.status(500).json({ 'error': 'you cannot delete this article'});
        })
    }
}