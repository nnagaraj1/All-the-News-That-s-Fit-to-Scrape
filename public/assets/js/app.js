$(document).ready(function(){
    // Variables
    var articleList = [];
    var articleId = '';
    var Article = '';
    var prevArticle = 0;
    var currArticle = 0;
    var nextArticle = 0;

    $('#comments').addClass('hidden');

    $.getJSON('/scrape', function(){ 
    });

    $(document).on('click', '#getArticles', function(){
        $.getJSON('/articles', function(){
            articleList = data;
            Article = articleList[0];
            showArticle(Article);
        });
    });
})

