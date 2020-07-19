var models = require('../models');

module.exports = {
    show: function(req, res) {
        var id = req.params.id;

        models.Comment.findAll({
            attributes: [ 'pseudo', 'body', 'createdAt' ],
            where: { idArticle: id }
        })
        .then(function(CommentFound) {
            if(CommentFound) {
                return res.status(200).json({ CommentFound });
            }
            else {
                return res.status(404).json({ 'error': 'Comment not Found' });
            }
        })
        .catch(function(err) {
            return res.status(500).json({ 'error': 'intern error' });
        })

    },

    create: function(req, res) {
        var idArticle = req.params.id;
        var pseudo    = req.body.pseudo;
        var body      = req.body.body;
        
        models.Article.findOne({
            attributes: [ 'id' ],
            where: { id: idArticle }
        })
        .then(function(articleFound) {
            if(articleFound) {
                var newComment = models.Comment.create({
                    pseudo: pseudo,
                    body: body,
                    idArticle: articleFound.id
                })
                .then(function(newComment) {
                    return res.status(201).json({ 'idComment': newComment.id });
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': err });
                })
            }
            else {
                return res.status(404).json({ 'error': 'article not found' });
            }
        })
        .catch(function(err) {
            return res.status(500).json({ 'error': err });
        })
    },

    delete: function(req, res) {
        var idComment = req.params.id;

        models.Comment.destroy({
            where: { id: idComment }
        })
        .then(function(commentFound) {
            return res.status(200).json({ 'deleted': commentFound });
        })
        .catch(function(err) {
            return res.status(500).json({ 'error': 'you cannot delete this comment' });
        })
    }
}