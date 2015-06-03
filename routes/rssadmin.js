// 1.处理请求
// req.query： 处理 get 请求，获取 get 请求参数
// req.params： 处理 /:xxx 形式的 get 或 post 请求，获取请求参数
// req.body： 处理 post 请求，获取 post 请求体
// req.param()： 处理 get 和 post 请求，但查找优先级由高到低为 req.params→req.body→req.query
// 2.返回数据---返回json 必须进行转化
var rss=require("../models/rss");
var rssspider=require("../models/rssspider");
var settings=require("../settings");
var rssarticle=require("../models/rssArticle");
exports.rssadd = function(req, res){
	var newrss=new rss(req.body);
  	newrss.save(function(msg,data){
  		if(!msg){
  			var returnvalue={
  				code:200,
  				data:null
  			}
  			res.writeHead(200,{"Content-type":"application/json"});
  			res.write(JSON.stringify(returnvalue));
  			res.end();
  		}else
  			console.log(msg);
  	});
};
//获取 对应url 的xml文档，并保存数据库
exports.rssupdatecontent=function(req,res){
	var url=req.body.url;
	var options=settings.articleOptions,
	returnvalue={
		code:200
	};
    rssspider.fetchRss(url,function(data){
    	for(var i=0;i<data.length;i++){
    		var newrssarticle=new rssarticle(data[i]);
    		newrssarticle.save(function(msg,result){
    			if(msg)
    				console.log(msg);
    			else
    				console.log("insert article success");
    		});
    	}
    	res.writeHead(200,{"Content-type":"application/json"});
		res.write(JSON.stringify(returnvalue));
		res.end();
    },options);
}
exports.rsssiteinfosave=function(req,res){
	var url=req.body.url;
	rssspider.siteInfo(url,null,function(data){
		console.log(data);
	})
//更新 rss 信息
exports.rssupdate=function(req,res){
	var params=req.body;
	rss.update(params.rssurl,params,function(msg,data){
		var returnvalue={msg:msg};
		if(err){
			returnvalue.code=500;
		}else{
			returnvalue.code=200;
			returnvalue.data=data;
		}
		res.writeHead(200,{"Content-type":"application/json"});
		res.write(JSON.stringify(returnvalue));
		res.end();
	})
}}
