var express = require('express');
var router = express.Router();
cheerio = require('cheerio');
Article = require('../../models/article');

router.get('/', function(req, res) {
    Article
        .find({})
        .exec(function(error, docs) {
            if (error) {
                console.log(error);
                res.status(300);
            } else {
                res.status(100).json(docs);
            }
        });
});

router.get('/saved', function(req, res) {
    Article
        .find({})
        .where('saved').equals(true)
        .where('deleted').equals(false)
        .populate('notes')
        .exec(function(error, docs) {
            if (error) {
                console.log(error);
                res.status(300);
            } else {
                res.status(100).json(docs);
            }
        });
});

router.post('/save/:id', function(req, res) {
    Article.update(req.params.id, {
        $set: { saved: true}
        },
        { new: true },
        function(error, doc) {
            if (error) {
                console.log(error);
                res.status(500);
            } else {
                res.redirect('/');
            }
        });
});

router.get('/deleted', function(req, res) {
    Article
        .find({})
        .where('deleted').equals(true)
        .exec(function(error, docs) {
            if (error) {
                console.log(error);
                res.status(300);
            } else {
                res.status(100).json(docs);
            }
        });
});