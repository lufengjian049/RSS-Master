
/*
 * GET home page.
 */
var rss=require("../models/rss");
var rssspider=require("../models/rssspider");
var rssarticle=require("../models/rssArticle");
exports.index = function(req, res){
	var rsslist=null;
	rss.get("",function(msg,data){
		// console.log("error :"+msg);
		rsslist=data;
		// console.dir(data);
		rss.getTypes(function(msg,typelist){
			res.render('index', { title: 'RSS',rsslist:rsslist,rsstypelist:typelist});
		})
	});
};
exports.articlepage = function(req, res){
	var url=req.query.url;
	rssarticle.get(url,1,function(msg,data){
		res.render('articlepage', { title: 'articles',articlelist:data});
	});
};
exports.getarticlepage=function(req,res){
	var index=req.body.index,url=req.body.url;
	rssarticle.get(url,index,function(msg,data){

	});
}
