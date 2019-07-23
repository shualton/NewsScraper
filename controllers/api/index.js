var express = require('express');
var router = express.Router();
cheerio = require('cheerio');
Article = require('../../models/article');
Comment = Note = require('../../models/comment');

router.use('/articles', require('./articles'));
router.use('/comments', require('./comment'));

router.get('/', function(req, res) {
    res.status(200).send('<a href=\'/api/articles/\'>articles</a><br><a href=\'/api/notes/\'>notes</a>');
});

module.exports = router;