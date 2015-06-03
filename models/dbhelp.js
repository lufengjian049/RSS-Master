var mongodb=require("./db");

var dbhelp={};
module.exports=dbhelp;

//searchobj--查询条件对象 ，tablename --表名 ，callback 回调 msg，data
//根据查询条件返回对象数组
//"$lt","$lte","$gt","$gte"分别对应<,<=,>,>=
//db.users.find({"age":{"$gte":18,"$lte":30}})
// $ne  不等于
// $in db.users.find({pageViews:{"$in":[10000,20000]}})  使用"$nin"返回与数组中所有条件都不匹配的文档
// $or db.users.find( { "$or": [ {"pageViews":{"$in":[10000,20000]}}, {"url":"http://www.cnblogs.com/refactor"} ]} ) 
// $not
// null可以匹配自身,而且可以匹配"不存在的"(不存在键)
// "$size"可以查询指定长度的数组   db.users.find({"emails":{"$size":3}})
//http://www.cnblogs.com/refactor/archive/2012/07/30/2591344.html
dbhelp.getListArray=function(searchobj,tablename,callback,returnobj){
	mongodb.open(function(err,db){
		if(err)
			return callback(err);
		mongodb.collection(tablename,function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			var params={};
			if(returnobj && returnobj.yes){
				for(var i=0;i<returnobj.yes.length;i++){
					params[returnobj.yes[i]]=1;
				}
			}
			if(returnobj && returnobj.no){
				for(var i=0;i<returnobj.no.length;i++){
					params[returnobj.no[i]]=0;
				}
			}
			// collection.find(findobj,function(err,rsslist){
			collection.find(searchobj,params).toArray(function(err,data){
				mongodb.close();
				if(err)
					return callback(err);
				callback(null,data);
			}) //已数组形式 返回
		})
	})
}
dbhelp.getPagesListArray=function(searchobj,tablename,callback,pageobj,returnobj){
	mongodb.open(function(err,db){
		if(err)
			return callback(err);
		mongodb.collection(tablename,function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			var params={};
			if(returnobj && returnobj.yes){
				for(var i=0;i<returnobj.yes.length;i++){
					params[returnobj.yes[i]]=1;
				}
			}
			if(returnobj && returnobj.no){
				for(var i=0;i<returnobj.no.length;i++){
					params[returnobj.no[i]]=0;
				}
			}
			collection.find(searchobj,params).sort(pageobj.sortobj).skip(pageobj.pagesize*(pageobj.pageindex-1)).limit(pageobj.pagesize).toArray(function(err,data){
				mongodb.close();
				if(err)
					return callback(err);
				callback(null,data);
			})
		})
	})
}
//获取单条记录
//searchparamobj--查询条件对象,tablename--表名,callback--回调 ，returnparamarr 可选参数，规定所要返回的字段属性 数组形式
dbhelp.getDataByParam=function(searchparamobj,tablename,callback,returnparamarr){
	mongodb.open(function(err,db){
		if(err)
			return callback(err);
		mongodb.collection(tablename,function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			var returnparamobj={};
			for(var i=0;i<returnparamarr.length;i++){
				returnparamobj[returnparamarr[i]]=1;
			}
			collection.findOne(searchparamobj,returnparamobj,function(err,data){
				mongodb.close();
				if(err)
					return callback(err);
				callback(null,data);
			})
		})
	})
}
//更新
//http://blog.csdn.net/qqiabc521/article/details/6325203
dbhelp.update=function(whereobj,updateobj,tablename,callback){
	mongodb.open(function(err,db){
		if(err)
			return callback(err);
		mongodb.collection(tablename,function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.update(whereobj,{$set:updateobj},function(err,data){
				mongodb.close();
				if(err)
					return callback(err);
				callback(null,data);
			})
		})
	})
}
dbhelp.save=function(addobj,tablename,callback){
	mongodb.open(function(err,db){
		if(err)
			return callback(err);
		mongodb.collection(tablename,function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.insert(addobj,function(err,data){
				mongodb.close();
				if(err)
					return callback(err);
				return callback(null,data[0]);
			})

		})
	})
}