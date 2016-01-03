// nodejs4.0不支持Rest,暂时使用apply,参数传递请遵循(event,...argv)规则
// this.emit(event....argv)触发事件
//run的回调函数也可以返回 [event,...argv] 来触发事件, 返回其他类型有可能出现错误
//on:事件监听(event,cb)
//cb(e,...argv)ps:e<=>事件本身
//约定事件on回调函数返回'one'时,表示这个函数在这次调用完成从事件回调函数队列中删除
//one的回调总是返回'one'
+(function(cb){
	//兼容性写法
	var name="event"
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
if(!(function(){}).apply)throw "It's shound used in limit IE9 or morden bower!";
var _event={
	get on(){ return function( event ,cb ) {
		if( typeof event === 'undefined' )return this;
		var handler = this[ event ] || (function(){ this[ event ] = [] ; return this[ event ] }).apply(this)
		if( typeof cb === 'function' )handler.push(cb);
		else console.error( 'No event name or No callback func');
		return this
	}}
	,get emit(){ return function( event ) {
		var handler = this[ event ] , _self =this , argv = [].slice.apply(arguments,[1])
		if( ! handler ) return this;
		handler.forEach( function( e ,indeOf ,self ) { 
			if( e.apply( _self ,[_self].concat(argv) ) === 'one' )handler.splice( indeOf ,1 ); 
		} )
		return this
	}}
	,get one(){ return function( event ,cb ) {
		var handler = this[ event ] || (function(){ this[ event ] = [] ; return this[ event ] }).apply(this)
		,	_self 	=	this
		if( typeof cb === 'function' ){ 
			handler.push( function() { cb.apply(_self) ; return 'one' } )
		}
		else console.error( 'No event name or No callback func');
		return this
	}}
	,get run(){ return function( cb ) { 
		var _self=this
		if(typeof cb !== 'function' )return this;
		var last= (function() { if( typeof process !== 'undefined' )return process.nextTick;else return false;})() || setTimeout
		last(function(){ cb.apply( _self ,[ _self ]) },0)
		return this 
	} }
}

module[exports]=function(cb){return Object.create(_event).run( cb )}
})