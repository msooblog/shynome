'use strict'
// nodejs4.0不支持Rest,暂时使用apply,参数传递请遵循apply(this,[acgr])规则
// this.emit(event.[...argv])触发事件
//run的回调函数也可以返回 [event,...argv] 来触发事件，支持function* 返回其他类型有可能出现错误
//on:事件监听
//约定事件回调函数返回'one'时,表示这个函数在这次调用完成从事件回调函数队列中删除，不支持function*
//one的回调总是返回'one'
let _event={
	get on(){ return ( event ,callback ) => {
		if( typeof event === 'undefined' )return this;
		var handler = this[ event ] || (() => { this[ event ] = [] ; return this[ event ] })()
		if( typeof callback === 'function' )handler.push(callback);
		else console.error( 'No event name or No callback func');
		return this
	}}
	,get emit(){ return ( event ,argv ) => {
		var handler = this[ event ]
		if( ! handler ) return this;
		handler.forEach( ( e ,indeOf ,self ) => { if( e.apply( this ,argv ) === 'one' )handler.splice( indeOf ,1 ); } )
		return this
	}}
	,get one(){ return ( event ,callback ) => {
		if( typeof event === 'undefined' )return this;
		var handler = this[ event ] || (() => { this[ event ] = [] ; return this[ event ] })()
		if( typeof callback === 'function' ){ handler.push( () => { callback() ; return 'one' } )}
		else console.error( 'No event name or No callback func');
		return this
	}}
	,get run(){ return ( callback ) => { 
		if(typeof callback !== 'function' )return this;
		let last= (() => { if( typeof process !== 'undefined' )return process.nextTick;else return false;})() || setTimeout
		last(()=>{
		let cb = callback.apply( this ,[ this ]);
		if(cb.next){
			let loop = ( cb ) => { 
				let next = cb.next() 
				if( next.done === true )return;
				if( typeof next.value.splice === 'function' )this.emit( next.value.splice(0,1) , next.value );
				return loop( cb );
			}
			loop( cb )
		}
		},0)
		return this 
	} }
}


if( typeof module === 'object' )module.exports = ( callback ) => Object.create(_event).run( callback );
else var event = ( callback ) => Object.create(_event).run( callback );