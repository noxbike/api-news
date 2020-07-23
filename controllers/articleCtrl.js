var models = require('../models');

module.exports = {
    create: function(req, res){
        var picture  = req.body.picture;
        var title    = req.body.title;
        var body     = req.body.body;
        var category = req.body.category;

        if(title == null || picture == null || body == null || category == null) {
            return res.status(400).json({ 'error': `missing ${picture}` });
        }

        var newArticle = models.Article.create({
            title:    title,
            picture:  picture,
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
        })
        .then(function(article) {
            if(article) {
                return res.status(200).json({ article });
            }
            else {
                return res.status(404).json({ 'error': 'no article found' });
            }
        })
        .catch(function(err) {
            return res.status(500).json({ 'error': 'invalid fields' });
        })
    },

    showArticle: function(req,res) {
        var idArticle = req.params.id;

        models.Article.findOne({
            attributes: [ 'picture', 'title', 'body', 'category', 'createdAt' ],
            where:      { id: idArticle }
        })
        .then(function(articleFound) {
            if(articleFound) {
                return res.status(200).json({ articleFound });
            }

            else {
                return res.status(404).json({ 'error': 'article not found' });
            }
        })
        .catch(function(err) {
            res.status(500).json({ 'error': 'intern error' });
        })
    },
    
    update: function(req, res) {
        var idArticle = req.params.id;
        var title     = req.body.title;

        models.Article.findOne({
            attributes: [ 'id', 'title' ],
            where:      { id: idArticle }
        })
        .then(function(articleFound) {
            if(articleFound) {
                articleFound.update({
                    'title': title
                })
                .then(function(success) {
                    return res.status(200).json({ 'message': 'updated with success' });
                })
                .catch(function(err) {
                    return res.status(400).json({ 'error': 'cannot update' });
                })
            }
            else {
                return res.status(404).json({ 'error': 'article not found' });
            }
        })
        .catch(function(err) {
            return res.status(500).json({ 'error': 'invalid params' });
        })
    },

    delete: function(req, res) {
        var idArticle =  req.params.id;

        models.Article.destroy({
            where: { id: idArticle }
        })
        .then(function(articleFound) {
            return res.status(200).json({ 'deleted': articleFound });
        })
        .catch(function(err) {
            return res.status(500).json({ 'error': 'you cannot delete this article' });
        })
    }
}