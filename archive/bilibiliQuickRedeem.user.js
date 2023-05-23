// ==UserScript==
// @id          bilibiliQuickRedeem
// @name        bilibili快捷兑换
// @description 对bilibili官方的兑换码添加快速兑换
// @namespace   bilibiliQuickRedeem
// @include     http://member.bilibili.com/*
// @version     1.0
// @require     http://code.jquery.com/jquery-1.11.1.js
// @author      Greesea
// ==/UserScript==
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}

function bilibiliRedeemLoad(){
	unsafeWindow.bilibiliRedeemCode=function(obj){
		var p = $(obj).parent();
		var parent=$(p).parent();
		var element = parent.find(".main-content-list-details");
		var each=element.html().split("");
		var connect="";
		for (var i=each.length-63;i<each.length-47;i++)
		{
			connect+=each[i];
		}
		$.ajax({
			url:"http://member.bilibili.com/store.html?act=gift&output=json",
			type:"POST",
			dataType:"json",
			data:"confirm_gift=1&gift="+connect+"&name=&address=&postcode=&contact=",
			success:function(data)
			{
				if(data==null){
					console.log("bilibiliRedeem:未知的错误");
					return;
				}
				if(data.code==-1){
					alert(data.msg);
				} else if(data.code==0){
					alert(data.msg);
				} else{
					alert(data);
				}
			},
			error:function(){
				alert("bilibiliRedeem:网络错误")
			}
		});
	}
	unsafeWindow.toggleDetail=function(e){
		var p = $(e).parent();
		var elem = p.find(".main-content-list-details");
		elem.stop().toggle(0,function(){
			if(elem.css("display")!="none"){
				p.css("margin-bottom",elem.height()+50);
			}
			else{
				p.css("margin-bottom",0);
			}
		}); 
		var data=elem.html();
		data=data.replaceAll("   <a onclick=\"bilibiliRedeemCode(this)\">兑换</a>","");
		data+="   <a onclick=\"bilibiliRedeemCode(this)\">兑换</a>"
		elem.html(data);
	};
	console.log("已覆盖toggleDetail!");
}

setInterval(function(){bilibiliRedeemLoad()},5000);