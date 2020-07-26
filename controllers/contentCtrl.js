var models = require('../models');

module.exports = {
    create: function(req, res) {
        var content   = req.body.content;
        var idArticle = req.params.id;

        models.Article.findOne({
            attributes: [ 'id' ],
            where: { id: idArticle}
        })
        .then(function(articleFound) {
            if(articleFound) {
                var newContent = models.Content.create({
                    content: content,
                    idarticle: articleFound.id
                })
                .then(function(newContent) {
                    return res.status(201).json({ 'idcontent': newContent.id });
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'cannot post this content' });
                })
            }
            else {
                return res.status(404).json({ 'error': 'article not found' });
            }
        })
        .catch(function(err) {
            return res.status(500).json({ 'error': 'inter error' });
        })
    },

    show: function(req, res) {
        var idarticle = req.params.id;

        models.Content.findAll({
            attributes: [ 'id', 'content', 'createdAt' ],
            where: { idarticle: idarticle }
        })
        .then(function(contentFound) {
            if(contentFound) {
                return res.status(200).json({ contentFound });
            }
            else {
                return res.status(404).json({ 'error': 'Content not Found' });
            }
        })
        .catch(function(err) {
            return res.status(500).json({ 'error': 'intern error' });
        })

    },

    update: function(req, res) {
        var idarticle = req.params.id;
        var content     = req.body.content;

        models.Content.findOne({
            attributes: [ 'id', 'content' ],
            where:      { id: idarticle }
        })
        .then(function(articleFound) {
            if(articleFound) {
                articleFound.update({
                    'content': content
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
    }
}