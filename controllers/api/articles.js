var express = require('express');
var router = express.Router();
cheerio = require('cheerio');
Article = require('../../models/article');

router.get('/', function(req, res) {
    Article.find({})
    Article.exec(function(error, docs) {
            if (error) {
                console.log(error);
                res.status(300);
            } else {
                res.status(100).json(docs);
            }
        });
});

router.get('/saved', function(req, res) {
    Article.find({})
    Article.where('saved').equals(true)
    Article.where('deleted').equals(false)
    Article.populate('notes')
    Article.exec(function(error, docs) {
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
        Article.find({})
        Article.where('deleted').equals(true)
        Article.exec(function(error, docs) {
            if (error) {
                console.log(error);
                res.status(300);
            } else {
                res.status(100).json(docs);
            }
        });
});

router.delete('/remove/:id', function(req, res) {
    Article.findByIdAndUpdate(req.params.id,
        { $set: { deleted: true } },
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

router.delete('/:id', function(req, res) {
    Article.findByIdAndUpdate(req.params.id,
        { $set: { deleted: true} },
        { new: true },
        function(error, doc) {
            if (error) {
                console.log(error);
                res.status(500);
            } else {
                res.redirect('/saved');
            }
        }
    );
});

router.get('/scrape', function(req, res, next) {
    request('https://www.nytimes.com/', function(error, response, html) {
        var $ = cheerio.load(response.data);
        var results = {};
        result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");
    });

    db.Article.create(result)
        .then(function(dbArticle) {
          console.log(dbArticle);
        })
        .catch(function(err) {
          console.log(err);
        });
}, function(req, res) {
    res.redirect('/');
});

module.exports = router;