/* Predefined Variables Are:

 *     blog_url

 *     latest_post

 *     background_color

 *     border_color

 *     scrolling_speed

 *     info_text

 *     close_button

 */

var entries; var feed;

var feed_url = blog_url.match(/\/$/) ? blog_url : blog_url+&quot;/&quot;;

feed_url += &quot;feeds/posts/default&quot;;

function recent_post_createEntries(){

    var entries = feed.entry;

    var entriesArr = [];

    for(var i=0; i&lt;latest_post; i++){

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

    for(var i=0; i&lt;links.length; i++){

        var link = links[i];

        if(link.rel == &quot;alternate&quot;){return link.href;}

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

    var src = feed_url+&quot;?alt=json-in-script&amp;callback=recent_post_start&amp;max-results=&quot;+latest_post;

    var s = &quot;&lt;script src='&quot;+src+&quot;'&gt;&lt;/script&gt;&quot;;

    document.write(s);

}

function recent_post_style(){

    var s = &quot;&lt;style type='text/css'&gt;&quot;;

    s += &quot;#recent_post{&quot;;

  s += &quot;position:absolute;&quot;;

    s += &quot;margin:0px;&quot;;

    s += &quot;padding: 5px 2px 2px;&quot;;

    s += &quot;width:auto;&quot;;

    s += &quot;background:#fff;&quot;;

    s += &quot;border:1px solid #ddd&quot;;

    s += &quot;}&quot;;

    s += &quot;&lt;/style&gt;&quot;;

    document.write(s);

}

function recent_post_content(){

    var s = &quot;&lt;div id='recent_post' title='All Blogger Tricks Ticker'&gt;&quot;;

    if(info_text){

	s += &quot;&lt;div style='float:left'&gt;&quot;;

    s += &quot; &lt;a href='&quot;+feed_url+&quot;'&gt;&quot;;

    s += &quot;  &lt;img src='http://lh6.ggpht.com/__TByDg0HQqc/S6cjD0Sz1OI/AAAAAAAAAd4/O4s-OkSpdF8/menujublog_rss.gif'&quot;;

    s += &quot; height='20'/&gt;&quot;;

    s += &quot; &lt;/a&gt;&quot;;

    s += &quot;&lt;/div&gt;&quot;;

    s += &quot;&lt;div style='float:left; text-align:right; margin-left:20px;'&gt;&quot;;

    s += &quot;Latest Articles:&quot;;

    s += &quot;&lt;/div&gt;&quot;;

    }

    s += &quot;  &lt;marquee style='float:left; margin-left:10px; width:82%' scrollAmount='&quot;+scrolling_speed+&quot;'&gt;&quot;;

    for(var i=0; i&lt;latest_post; i++){

        var recent_post_entries = entries[i];

        s += &quot;&lt;a href='&quot;+recent_post_entries.href+&quot;' &quot;;

        s += &quot;onmouseover='this.parentNode.stop()' onmouseout='this.parentNode.start()'&quot;;

        s += &quot;&gt;&quot; + recent_post_entries.title + &quot;&lt;/a&gt;&quot;;

        if(i != latest_post-1){s += &quot; | &quot;;}

    }

    s += &quot;&lt;/marquee&gt;&quot;;

    if(close_button){

	s += &quot;&lt;div style='float:right; margin-right:10px;'&gt;&quot;;

    s += &quot;&lt;a href='javascript:void(0)' onclick='document.getElementById(\&quot;recent_post\&quot;).style.display=\&quot;none\&quot;'&gt;&quot;;

    s += &quot;(x)&quot;;

    s += &quot;&lt;/a&gt;&quot;;

    s += &quot;&lt;/div&gt;&quot;;

    }

    document.write(s);

}

recent_post_text();

