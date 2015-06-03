var dbhelp=require("./dbhelp");

function RssArticle(rssarticle){
	// console.log(typeof rssarticle);
	this.rssurl=rssarticle.rssurl;
	this.title=rssarticle.title;
	this.summary=rssarticle.summary;
	this.date=rssarticle.date;
	this.guid=rssarticle.guid;
	this.link=rssarticle.link;
	this.author=rssarticle.author;
	this.comments=rssarticle.comments; 
	this.categories=rssarticle.categories;
}
RssArticle.prototype.save=function(callback){
	var rssarticle={
		rssurl:this.rssurl,
		title:this.title,
		summary:this.summary,
		date:this.date,
		guid:this.guid,
		link:this.link,
		author:this.author,
		comments:this.comments,
		categories:this.categories
	}
	mongodb.open(function(err,db){
		if(err)
			return callback(err);
		mongodb.collection("rssarticlelist",function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.insert(rssarticle,function(err,data){
				mongodb.close();
				if(err)
					return callback(err);
				return callback(null,data[0]);
			})

		})
	})
}
//获取文章列表
RssArticle.get=function(url,index,callback){
	dbhelp.getPagesListArray({rssurl:url},"rssarticlelist",callback,{
		pagesize:5,
		pageindex:index,
		sortobj:{"date":-1}
	});
}
module.exports=RssArticle;