// nodejs4.0不支持Rest,暂时使用apply,参数传递请遵循apply(this,[acgr])规则
// this.emit(event.[...argv])触发事件
//run的回调函数也可以返回 [event,...argv] 来触发事件, 返回其他类型有可能出现错误
//on:事件监听
//约定事件回调函数返回'one'时,表示这个函数在这次调用完成从事件回调函数队列中删除
//one的回调总是返回'one'

var event=function(callback){
var _event={
	get on(){ return function( event ,callback ) {
		if( typeof event === 'undefined' )return this;
		var handler = this[ event ] || (function(){ this[ event ] = [] ; return this[ event ] }).apply(this)
		if( typeof callback === 'function' )handler.push(callback);
		else console.error( 'No event name or No callback func');
		return this
	}}
	,get emit(){ return function( event ,argv ) {
		var handler = this[ event ] , _self =this
		if( ! handler ) return this;
		handler.forEach( function( e ,indeOf ,self ) { 
			if( e.apply( _self ,argv ) === 'one' )handler.splice( indeOf ,1 ); 
		} )
		return this
	}}
	,get one(){ return function( event ,callback ) {
		var handler = this[ event ] || (function(){ this[ event ] = [] ; return this[ event ] }).apply(this)
		,	_self 	=	this
		if( typeof callback === 'function' ){ 
			handler.push( function() { callback.apply(_self) ; return 'one' } )
		}
		else console.error( 'No event name or No callback func');
		return this
	}}
	,get run(){ return function( callback ) { 
		var _self=this
		if(typeof callback !== 'function' )return this;
		var last= (function() { if( typeof process !== 'undefined' )return process.nextTick;else return false;})() || setTimeout
		last(function(){ callback.apply( _self ,[ _self ]) },0)
		return this 
	} }
}
return Object.create(_event).run( callback )
}

if( typeof module === 'object' )module.exports = event;