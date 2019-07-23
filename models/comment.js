var mongoose = require ("mongoose");

var schema = mongoose.schema;

var comments = new schema({
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

var Comment = mongoose.model("Comment", comments);

module.exports = Comment;