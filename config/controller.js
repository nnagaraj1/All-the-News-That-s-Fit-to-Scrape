var express = require("express");
var router = express.Router();
var path = require("path");
var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");

// Importing Comment and Article models
var Comment = require("./models/comment.js");
var Article = require("./models/article.js");

// Index Page
router.get("/", function(req, res) {
  res.redirect("/scrape");
});

// To Scrape Data
router.get("/articles", function(req, res) {
  Article.find()
    .sort({ _id: -1 })
    .populate("comments")
    .exec(function(err, doc) {
      if (err) {
        console.log(err);
      } else {
        var hbsObject = { Article: doc };
        res.render("index", hbsObject);
      }
    });
});

// Scraping
router.get("/scrape", function(req, res) {
  request("https://www.nytimes.com/", function(req, res) {
    var $ = cheerio.load(html);
    // Grab items with "inner" class within "article" tag
    // $("article .inner").each(function(i, element){
    //     var res = {};
    //     // Get the title
    //     res.title = $(this).children("header").children("h2").text().trim() + "";
    //     // Get the link
    //     res.link = "https://www.nytimes.com/" + $(this).children("header").children("h2").children("a").attr("href").trim();
    //     // Get the article summary
    //     res.summary = $(this).children("div").text().trim() + "";
    //     // If error:
    //     if(res.title !== "" && res.summary !== "") {

    //     }
    // })
  });
});

mongoose.connect(
  "mongodb://",
  function(err) {
    if (err) throw err;
    console.log("database connected");
  }
);
