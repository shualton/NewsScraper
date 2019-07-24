var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var db = require("../../models")
var axios = require("axios")

// /api/aticles/
router.get('/', function(req, res) {
    db.Article.find({})
    db.Article.exec(function(error, docs) {
            if (error) {
                console.log(error);
                res.status(300);
            } else {
                res.status(100).json(docs);
            }
        });
});

// /api/aticles/saved
router.get('/saved', function(req, res) {
    db.Article.find({})
    db.Article.where('saved').equals(true)
    db.Article.where('deleted').equals(false)
    db.Article.populate('notes')
    db.Article.exec(function(error, docs) {
            if (error) {
                console.log(error);
                res.status(300);
            } else {
                res.status(100).json(docs);
            }
        });
});

// /api/aticles/save/:id
router.post('/save/:id', function(req, res) {
    db.Article.update(req.params.id, {
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

// /api/aticles/deleted
router.get('/deleted', function(req, res) {
        db.Article.find({})
        db.Article.where('deleted').equals(true)
        db.Article.exec(function(error, docs) {
            if (error) {
                console.log(error);
                res.status(300);
            } else {
                res.status(100).json(docs);
            }
        });
});

// /api/aticles/remove/:id
router.delete('/remove/:id', function(req, res) {
    db.Article.findByIdAndUpdate(req.params.id,
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

// /api/aticles/:id
router.delete('/:id', function(req, res) {
    db.Article.findByIdAndUpdate(req.params.id,
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

// /api/aticles/scrape
router.get('/scrape', function(req, res, next) {
    var results = {};
    axios.get('https://www.nytimes.com/', function(error, response, html) {
        var $ = cheerio.load(response.data);
        
      results.title = $(this)
        .children("a")
        .text();
      results.link = $(this)
        .children("a")
        .attr("href");
    });

    db.Article.create(results)
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