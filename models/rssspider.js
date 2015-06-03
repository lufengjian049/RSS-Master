var request = require('request')  
    , FeedParser = require('feedparser'); 
    // , rssSite = require('../rssSite.json'); 
var siteInfoOption = ['title', 'description', 'date', 'link', 'xmlurl', 'author', 'favicon', 'copyright', 'generator', 'image'];
// var channels = rssSite.channel;  
function fetchRss(feed,callback,options) { 
    var posts;  
    // Define our streams  
    var req = request(feed, {timeout: 10000, pool: false});  
    req.setMaxListeners(50);  
    // Some feeds do not response without user-agent and accept headers.  
    req.setHeader('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36');
    req.setHeader('accept', 'text/html,application/xhtml+xml');  
    var feedparser = new FeedParser();  
  
    // Define our handlers  
    req.on('error', callback);  
    req.on('response', function(res) {  
        var stream = this; 
        posts = new Array();  
        if (res.statusCode != 200) 
            return this.emit('error', new Error('Bad status code'));  
        stream.pipe(feedparser);  
    });  
  
    feedparser.on('error', callback);  
    feedparser.on('end', function(err){  
        if(err)
            callback(err);
        callback(posts);
      //  postService.savePost(posts);    //存到数据库  
    });  
    feedparser.on('readable', function() {  
        var post;  
        while (post = this.read()) {  
            posts.push(pick(feed,post,options));
        } 
    });  
} 
function pick(feed,sourceobj,options){
    var returnobj={rssurl:feed};
    for(var i=0;i<options.length;i++){
        var cur=options[i];
        returnobj[cur]=sourceobj[cur];
    }
    return returnobj;
}
module.exports ={
    fetchRss:fetchRss
}
