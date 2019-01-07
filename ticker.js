<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js"></script>
<script src="http://www.jquerynewsticker.com/includes/jquery.ticker.js" type="text/javascript"></script>
<script type="text/javascript">
//----------------------------Defaults
var ListBlogLink = "https://www.batalngoding.com";
var ListCount = 5;
var TitleCount = 70;
var ListLabel = "Widgets";

//----------------------------Function Start
function mbtlist(json) {
document.write('<ul id="js-news" class="js-hidden">');
for (var i = 0; i < ListCount; i++)
{

//-----------------------------Variables Declared
var listing= ListImage = ListUrl = ListTitle = ListImage = ListContent = ListConten = ListAuthor = ListTag = ListDate = ListUpdate = ListComments = thumbUrl = TotalPosts = sk = AuthorPic= ListMonth = Y = D = M = m = YY = DD = MM = mm = TT =  "";
//----------------------------- Title URL
for (var j = 0; j < json.feed.entry[i].link.length; j++) {
if (json.feed.entry[i].link[j].rel == 'alternate') {
break;
}
}
ListUrl= "'" + json.feed.entry[i].link[j].href + "'";
//----------------------------------- Title Stirng
if (json.feed.entry[i].title!= null)
{
ListTitle= json.feed.entry[i].title.$t.substr(0, TitleCount);
}

if (json.feed.entry[i].thr$total)
{
ListComments= "<a href='"+json.feed.entry[i].link[j].href+"#comment-form'>"+json.feed.entry[i].thr$total.$t+"</a>";
}
ListAuthor= json.feed.entry[i].author[0].name.$t.split(" ");
ListAuthor=ListAuthor.slice(0, 1).join(" ");
AuthorPic = json.feed.entry[i].author[0].gd$image.src;

//################### Date Format

ListMonth= ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

ListDate= json.feed.entry[i].published.$t.substring(0,10);

                         Y = ListDate.substring(0, 4);
                        m = ListDate.substring(5, 7);
                         D = ListDate.substring(8, 10);
                         M = ListMonth[parseInt(m - 1)]; 
//----------------------------------- Printing List
var listing = "<li class='news-item'><span class='iauthor'><img class='iauthorpic' src='"+AuthorPic+"'/>"
+ListAuthor+ "</span> <span class='icomments'>"
+ListComments + "</span>  <span class='idate'>"
+ D + " " + M + "</span><i class='fa fa-chevron-right'></i> <a class='mbttitle' href="
+ListUrl+
"target='_blank'>"
+ListTitle+
"</a></li>";
document.write(listing);
}
}
document.write("</ul><script src='"+ListBlogLink+"/feeds/posts/default/-/"+ListLabel+"?alt=json-in-script&callback=mbtlist'></"+"script>");

/*##########Breaking News Ticker Settings########*/
    $(function () {
        $('#js-news').ticker({
        speed: 0.20,
        controls: true,  
        titleText: 'Hottest',
        displayType: 'reveal',
        pauseOnItems: 2000,   
});
});
</script> 
