var express = require ("express");
var router = express.Router();
// Article = require("../models/article");
var db = require("../../models")

router.get('/saved', function(req, res) {
    db.Article
        .find({})
        .where('saved').equals(true)
        .where('deleted').equals(false)
        .populate('notes')
        .sort('-date')
        .exec(function(error, articles) {
            if (error) {
                console.log(error);
                res.status(500);
            } else {
                console.log(articles);
                let hbsObject = {
                    title: "News Scraper",
                    subtitle: "Scrape Your Favorite NYT Articles!",
                    articles: articles
                };
                res.render("saved" ,hbsObject);
            }
        });
});


router.get('/', function(req, res) {
    db.Article
        .find({})
        .where('saved').equals(false)
        .where('deleted').equals(false)
        .sort('-date')
        .limit(20)
        .exec(function(error, articles) {
            if (error) {
                console.log(error);
                res.status(500);
            } else {
                console.log(articles);
                let hbsObject = {
                    title: "News Scraper",
                    subtitle: "Scrape Your Favorite NYT Articles!",
                    articles: articles
                };
                res.render('index', hbsObject);
            }
        });
});



module.exports = router;

