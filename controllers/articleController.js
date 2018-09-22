
let db = require("../models"); // Require all models


module.exports = {
  

  save:  function(req, res){
    console.log("Save Article Path hit");
    db.Article.findOne({articleId: req.body.articleId})
    .then(function(response){
      if (response === null) { // Only Create Article if it has not been Created
        db.Article.create(req.body).then((response) => {console.log(response + " Has been Created")
          res.send('Sucessfully Saved!');
        })
        .catch(err => res.json(err));
      } // End if
    })
  },

  getSavedArticles: function(req, res){
    console.log("Get Saved Articles Path hit");
     db.Article
     .find({})
      .sort({ date: -1 })
       .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
  },

  deleteSavedArticle: function(req, res){
    console.log("Delete Articles Path hit");
    console.log(JSON.stringify(req.body));
    db.Article
    .remove({articleId: req.body.articleId}, (err)=>{
       if (err) throw err;

       console.log("Article Sucessfully Deleted");

       db.Article
         .find({})
          .sort({ date: -1 })
           .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
      })
       .catch(err => res.status(422).json(err));
  }
};
