/* Predefined Variables Are:
 *	 blog_url
 *	 latest_post
 *	 background_color
 *	 border_color
 *	 scrolling_speed
 *	 info_text
 *	 close_button
 */

var entries;
var feed;
var feed_url = blog_url.match(/\/$/) ? blog_url : blog_url+"/";
feed_url += "feeds/posts/default";

function recent_post_createEntries(){
	var entries = feed.entry;
	var entriesArr = [];
	for(var i=0; i < latest_post; i++){
		var entry = entries[i];
		var entryObj = new Object();
		entryObj.title = entry.title.$t;
		entryObj.href  = getHref(entry.link);
		entriesArr.push(entryObj);
	}
	return entriesArr;
}
function getBlogTitle(){
	return feed.title.$t;
}
function  getBlogURL(){
	return getHref(feed.link);
}
function getHref(links){
	for(var i=0; i<links.length; i++){
		var link = links[i];
		if(link.rel == "alternate"){return link.href;}
	}
	return null;
}
function recent_post_start(json){
	feed = json.feed;
	entries = recent_post_createEntries();
	recent_post_style();
	recent_post_content();
}
function recent_post_text(){
	var src = feed_url+"?alt=json-in-script&callback=recent_post_start&max-results="+latest_post;
	var s = "&lt;script src='"+src+"'&gt;&lt;/script&gt;";
	document.write(s);
}
function recent_post_style(){
	var s = "<style type='text/css'>";
	s += "#recent_post{";
	s += "position:absolute;";
	s += "margin:0px;";
	s += "padding: 5px 2px 2px;";
	s += "width:auto;";
	s += "background:#fff;";
	s += "border:1px solid #ddd";
	s += "}";
	s += "</style>";
	document.write(s);
}
function recent_post_content(){
	var s = "<div id='recent_post' title='All Blogger Tricks Ticker'>";
	if(info_text){
		s += "<div style='float:left'>";
		s += " <a href='"+feed_url+"'>";
		s += "  <img src='http://lh6.ggpht.com/__TByDg0HQqc/S6cjD0Sz1OI/AAAAAAAAAd4/O4s-OkSpdF8/menujublog_rss.gif'";
		s += " height='20'/>";
		s += " </a>";
		s += "</div>";
		s += "<div style='float:left; text-align:right; margin-left:20px;'>";
		s += "Latest Articles:";
		s += "</div>";
	}

	s += "  <marquee style='float:left; margin-left:10px; width:82%' scrollAmount='"+scrolling_speed+"'>";

	for(var i=0; i<latest_post; i++){
		var recent_post_entries = entries[i];
		s += "<a href='"+recent_post_entries.href+"' ";
		s += "onmouseover='this.parentNode.stop()' onmouseout='this.parentNode.start()'";
		s += ">" + recent_post_entries.title + "</a>";
		if(i != latest_post-1){s += " | ";}
	}

	s += "</marquee>";

	if(close_button){
		s += "<div style='float:right; margin-right:10px;'>";
		s += "<a href='javascript:void(0)' onclick='document.getElementById(\"recent_post\").style.display=\"none\"'>";
		s += "(x)";
		s += "</a>";
		s += "</div>";
	}
	document.write(s);
}
recent_post_text();
