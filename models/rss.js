var dbhelp=require("./dbhelp");

function Rss(rss){
	this.rssfrom=rss.rssfrom;
	this.rssmainname=rss.rssmainname;
	this.rsstype=rss.rsstype;
	this.rssurl=rss.rssurl;
	this.work=true;//新添加的 默认有效
}
module.exports=Rss;

//获取 列表信息
Rss.get=function(url,callback){
	if(url)
		var findobj={url:url};
	else
		var findobj={};
	dbhelp.getListArray(findobj,"rsslist",callback);
}
//获取 rss types列表
Rss.getTypes=function(callback){
	dbhelp.getListArray({},"rsstype",callback);
}
Rss.getTypeByid=function(id,callback){
	dbhelp.getDataByParam({typeid:id},"rsstype",callback);
}
Rss.prototype.save=function(callback){
	var rss={
		rssfrom:this.rssfrom,
		rssmainname:this.rssmainname,
		rsstype:this.rsstype,
		rssurl:this.rssurl,
		work:this.work
	}
	dbhelp.save(rss,"rsslist",callback);
}
Rss.update=function(url,updateobj,callback){
	dbhelp.update({url:url},updateobj,"rsslist",callback);
}
//获取rss content
// Rss.updateContent=function(url,callback){
// 	ng.get(url,function(data,status,headers){
// 		var parser = new xml2js.Parser();
// 		var json =  parser.parseString(data);
// 		//console.log("xml data:"+json.feed.title);
// 		callback(null,json);
// 		// Rss.update(url,{content:data},function(err,data){
// 		// 	callback(null,data);
// 		// })
// 	},null,"utf8").on("error",function(e){
// 		callback(e.message);
// 	})
// }