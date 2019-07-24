var express = require("express");
var logger = require("morgan");
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var routes = require("./controllers");
var PORT = process.env.PORT || 3000;
var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

var db = mongoose.connection;

db.on("error", function(error) {
    console.log("Database Error:", error);
});

app.engine("handlebars", exphbs({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.use(routes);

app.listen(PORT, function() {
  console.log("App running on port 3000!");
});