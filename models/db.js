// var settings=require("../settings"),
// 	Db=require("mongodb").Db,
// 	Connection=require("mongodb").Connection,
// 	Server=require("mongodb").Server;

// module.exports=new Db(settings.db,new Server(settings.host,settings.port),{safe:true});

var settings=require("../settings"),
	mongodb=require("mongodb"),
	server=new mongodb.Server(settings.host,settings.port,{auto_reconnect:true});

module.exports=new mongodb.Db(settings.db,server,{safe:true});
