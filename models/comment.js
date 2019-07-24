var mongoose = require ("mongoose");

var Schema = mongoose.Schema;

var comments = new Schema({
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