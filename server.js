var express = require("express");
var mongodb = require("mongodb");
var mongoose = require("mongoose");
var logger = require("morgan");
var bodyParser = require("body-parser");
var path = require("path");

mongoose.Promise = Promise;
// to scrape
// var request = require("request");
// var cheerio = require("cheerio");

// to initialize app
var PORT = process.env.PORT || 8080;
var app = express();
app.use(logger("dev"));

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

//db
var db = require("./models");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/test";
mongoose.connect(MONGODB_URI);

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./routes");

routes.HTML(app);
routes.API(app, db);

// // For errors
// app.use(function(req, res) {
//   res.render("Error 404");
// });

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
