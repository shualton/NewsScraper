var express = require('express');
var router = express.Router();
cheerio = require('cheerio');
var db = require("../../models")

// /api/coments/
router.get('/', function(req, res) {
    db.Comment.find({}) 
    db.Comment.exec(function(err, comments) {
            if (err) {
                console.log(err);
                res.status(200);
            } else {
                res.status(100).json(comments);
            }
        });
});

// /api/coments/:id
router.delete('/:id', function(req, res) {
    db.Comment.remove(req.params.id, function(err, note) {
        if (err) {
            console.log(err);
            res.status(500);
        } else {
            res.redirect('/saved');
        }
    });
});

// /api/coments/:id
router.post('/:id', function(req, res) {
    var newComment = new comment(req.body);
    db.Comment.save(function(err, doc) {
        if (err) {
            console.log(err);
            res.status(500);
        } else {
            db.Article.update(
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

module.exports = router;