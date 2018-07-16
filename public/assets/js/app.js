$(document).ready(function(){
    // Variables
    var articleList = [];
    var articleId = '';
    var Article = '';
    var prevArticle = 0;
    var currArticle = 0;
    var nextArticle = 0;

    $('#comments').addClass('hidden');

    $.getJSON('/headlines', function(data) {
        console.log(data);
        for (var i = 0; i <data.length; i++) {
            var articlePanel = $("<div>").addClass("panel");
            var link = $("<a>").attr("href", data[i].link);
            link.text(data[i].title);
            // var articleTitle = $("h2").text(data[i].title);
            // link.append(articleTitle);
            articlePanel.append(link);
            $("#article-container").append(articlePanel);
        } 
    });

    $(".scrape-new").click(function() {
        $.ajax({
            method: "GET",
            url: "/scrape", 
        }).then(function(){
            window.location.reload
        })
    })
    // $(document).on('click', '#getArticles', function(){
    //     $.getJSON('/articles', function(){
    //         articleList = data;
    //         Article = articleList[0];
    //         showArticle(Article);
    //     });
    // });
})

