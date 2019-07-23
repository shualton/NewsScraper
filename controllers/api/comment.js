var express = require('express');
var router = express.Router();
cheerio = require('cheerio');
Article = require('../../models/article');
Comment = Note = require('../../models/comment');

router.get('/', function(req, res) {
    Comment.find({}) 
    Comment.exec(function(err, comments) {
            if (err) {
                console.log(err);
                res.status(200);
            } else {
                res.status(100).json(comments);
            }
        });
});

router.delete('/:id', function(req, res) {
    Note.remove(req.params.id, function(err, note) {
        if (err) {
            console.log(err);
            res.status(500);
        } else {
            res.redirect('/saved');
        }
    });
});

router.post('/:id', function(req, res) {
    var newComment = new comment(req.body);
    newNote.save(function(err, doc) {
        if (err) {
            console.log(err);
            res.status(500);
        } else {
            Article.update(
                { _id: req.params.id },
                { $push: { 'comments': doc.id } },
                function(error, newDoc) {
                    if (error) {
                        console.log(error);
                        res.status(500);
                    } else {
                        res.redirect('/saved');
                    }
                }
            );
        }
    });
});
