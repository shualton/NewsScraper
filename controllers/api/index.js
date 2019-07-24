var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
// Article = require('../../models/article');
// Comment = Note = require('../../models/comment');

// /api/articles
router.use('/articles', require('./articles'));
// /api/comments
router.use('/comments', require('./comment'));

// /api
router.get('/', function(req, res) {
    res.status(200).send('<a href=\'/api/articles/\'>articles</a><br><a href=\'/api/comment/\'>comments</a>');
});

module.exports = router;