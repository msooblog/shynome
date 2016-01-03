'use strict'
/*
*暂时只做浏览器端的ajax访问,本来想做一个版本前后端通用，貌似不适合
*依赖event.es5.js(By shynome)很明显不支持ie8
 */
+(function(cb){
	//兼容性写法
	var name="pjax"
	if(typeof define === "function" && define.cmd){
		define(name,null,function(require,exports,module){cb(require,"exports",module)})
	}else if(typeof module === "object" && typeof module.exports === "object"  && typeof require === "function" ){
		cb(require,exports,module)
	}else if(window){
		cb(function(v){return window[v]},name,window)
	}else{
		throw name+" run fail"
	}
})(function(require,exports,module){
	if(!"XMLHttpRequest" in window)throw "xhr run fail";
	var event=require("./event.es5.js")
	,	shy=require("./shy.js")
	,	m={
		get:/get/i
		,'?':/\?/
		,type:/content-type: (.+)/i
		,charset:/charset=(.+)/i
		,binary:/binary/i
	}
	var	config={
		method : 'GET'
		,async : true
		,headers : {
			pjax : 0//默认不添加历史
			,'content-type' : 'application/json;charset=UTF-8'
		}
		,data : null
	}
	//history
	if(window && 'pushState' in window ){
		//html5原生
		window.onpopstate=function(e){
			e.preventDeafult();
		}
	}else if(window && 'onhashchange ' in window ){
		//决定了history不支持ie9，ie9直接跳转
	}
	module[exports]=function(url,options,callback){
		if(!url)throw "url must be need";
		var c = shy.update(config,options)
		c.url=url
		if( c.method.match(m.get) ){//对get方式的data处理
			if(c.url.match(m['?'])===null)c.url+='?';
			for(var i in c.data){
				c.url+=i+'='+c.data[i]+"&"
			}
			c.url=c.url.slice(0,-1)
			c.data=null
		}
		var pjax=event(function(e){
			e.xhr=new XMLHttpRequest()
			e.xhr.responseType='blob'
			e.xhr.onreadystatechange=function(){
				switch(e.xhr.readyState){
					case 0:e.emit('ready');break;
					case 1:e.emit('start');break;
					case 2:e.emit('open');break;
					case 3:e.emit('loading');break;
					case 4:e.emit('end').emit('destory');break;
					default:e.emit('eroor').emit('destory');
				}
			}
			e.xhr.open(c.method,c.url,c.async)
			e.xhr.send(JSON.stringify(c.data))
		})
		.on('destory',function(e){e=null;})
		.on('start',function(e){
			for(var i in c.headers){e.xhr.setRequestHeader(i,c.headers[i])}
			if(callback)e.on('parse',callback);
		})
		.on('end',function(e){//解析数据
			var response=e.xhr.response
			,	headers=e.xhr.getAllResponseHeaders()
			,	type=headers.match(m.type)//这里可能会报错
			,	charset=headers.match(m.charset)
			if(type)type=type[1].split(';')[0];
			else type='text'
			if(charset)charset=charset[1];
			else charset='utf8'
			var	url=URL.createObjectURL(response)
			,	detail={type:type}
			if(charset.match(m.binary)){
				//如果是二进制数据直接返回一个链接
				detail.dType='binary'
				e.emit('parse',url,detail)
			}else{
				//否则再请求一次，将blob数据转成text
				if(type.match(/html/i)) detail.dType='document';
				else if(type.match(/json/i)) detail.dType='json';
				else detail.dType='text';
				var	xhr=new XMLHttpRequest()
				xhr.responseType=detail.dType
				xhr.open('get',url,true)
				xhr.onloadend=function(){
					e.emit('parse',xhr.response,detail)
					xhr=null
				}
				xhr.send()
			}
		})
		return pjax
	}
})