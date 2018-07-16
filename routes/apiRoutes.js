var axios = require("axios");
var cheerio = require("cheerio");
module.exports = (app, db) => {
  app.get("/scrape", function(req, res) {
    axios.get("https://www.nytimes.com/").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);

      // Now, we grab every h2 within an article tag, and do the following:
       $("article h2").each(function(i, element) {
        // Save an empty result object
         var result = {};

    //     // Add the text and href of every link, and save them as properties of the result object
         result.title = $(this)
          .children("a")
           .text();
         result.link = $(this)
           .children("a")
           .attr("href");
        console.log(result);
    //     // Create a new Article using the `result` object built from scraping
         db.Article.create(result)
           .then(function(dbArticle) {
             // View the added result in the console
             console.log(dbArticle);
           })
           .catch(function(err) {
             // If an error occurred, send it to the client
             return res.json(err);
           });
       });
    
      // If we were able to successfully scrape and save an Article, send a message to the client
      res.send("Scrape Complete");
    });
  });
  app.get("/headlines", function(req, res) {
    db.Article.find({})
      .populate("comments")
      .then(function(dbArticles) {
        res.json(dbArticles);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.get("/comments", function(req, res) {
    db.Comment.find({})
      .then(function(dbComments) {
        res.json(dbComments);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.get("/headlines/:id", function(req, res) {
    db.Article.find({
      _id: req.params.id
    })
      .populate("comments")
      .then(function(dbArticles) {
        res.json(dbArticles);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.delete("/comments/:id", function(req, res) {
    const thisId = req.params.id;
    db.Comment.findById(thisId).then(function(comment) {
      comment.remove();
      res.json({});
    });
  });

  app.post("/headlines/:id", function(req, res) {
    db.Comment.create(req.body)
      .then(function(dbComments) {
        return db.Article.findOneAndUpdate(
          {
            _id: req.params.id
          },
          {
            $push: { comments: dbComments._id }
          },
          {
            new: true
          }
        ).populate("comments");
      })
      .then(function(dbArticles) {
        res.json(dbArticles);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
};
