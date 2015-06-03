$(function(){
	$("#btnaddrss").on("click",function(){
		var params=$("#rssaddform").serialize(),url=$("#inputrssurl").val();
		$.post("/addrss",params,function(data){
			if(data.code == 200){
				//添加 保存成功 效果
				$('.rssAddmodal').modal('hide');
				//下载 源 文章并保存数据库
				$.post("/updatecontent",{url:url},function(){
				})
			}
		});
	})
	$(".showdetail").on("click",function(){
		window.open("/articlepage?url="+$(this).attr("rssurl"));
	})

	$(".pagination>li").on("click",function(){
		
	})

	$("#postxml").on("click",function(){
		// var url="http://segmentfault.com/feeds/blog/yuyang040160120";
		var url="http://www.tuicool.com/articles/VnMVriN";
		$.post("/rsssiteinfosave",{url:url},function(){
				})
	})
})