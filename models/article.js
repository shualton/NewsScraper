var mongoos  = require("mongoose");

var schema = mongoos.schema;

var articles = new schema ({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    saved: {
        type: Boolean,
        required: true,
        default: false
    },
    removed: {
        type: Boolean,
        required: true,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    comments: [{
        type: schema.Types,ObjetId,
        required: false
    }]
});

var Article = mongoose.model("Article", articles);
module.exports = Article;